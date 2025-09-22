<?php
// Script d'envoi email pour 3dassistance.fr avec SMTP OVH
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.3dassistance.fr');
header('Access-Control-Allow-Methods: POST, OPTIONS'); 
header('Access-Control-Allow-Headers: Content-Type');

// Gestion CORS preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

// Récupération des données
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Aucune donnée reçue']);
    exit();
}

// Validation des champs obligatoires
$required_fields = ['nom', 'telephone', 'typeProbleme'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Le champ '$field' est obligatoire"]);
        exit();
    }
}

// Nettoyage des données
$nom = htmlspecialchars(trim($input['nom']));
$telephone = htmlspecialchars(trim($input['telephone']));
$codePostal = htmlspecialchars(trim($input['codePostal'] ?? 'Non précisé'));
$typeProbleme = htmlspecialchars(trim($input['typeProbleme']));
$message = htmlspecialchars(trim($input['message'] ?? 'Aucun message supplémentaire'));

// Configuration email
$to = 'contact@3dassistance.fr';
$subject = '🎯 Nouvelle demande - ' . $typeProbleme;

// Corps du message HTML professionnel
$html_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: #1FA77D; color: white; padding: 25px; text-align: center; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; background: #f9f9f9; }
        .field { margin-bottom: 20px; padding: 15px; background: white; border-radius: 5px; border-left: 4px solid #1FA77D; }
        .label { font-weight: bold; color: #1FA77D; font-size: 14px; }
        .value { margin-top: 5px; font-size: 16px; color: #333; }
        .message-box { background: white; padding: 20px; margin-top: 10px; border-radius: 5px; border: 1px solid #ddd; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; background: #f0f0f0; }
        .urgent { background: #fff3cd; border-left: 4px solid #ffc107; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🎯 Nouvelle demande de devis</h1>
            <p>3dassistance.fr - Dératisation Paris</p>
        </div>
        <div class='content'>
            <div class='field'>
                <div class='label'>👤 CLIENT</div>
                <div class='value'>$nom</div>
            </div>
            
            <div class='field'>
                <div class='label'>📞 TÉLÉPHONE</div>
                <div class='value'><a href='tel:$telephone' style='color: #1FA77D; text-decoration: none;'>$telephone</a></div>
            </div>
            
            <div class='field'>
                <div class='label'>📍 ZONE D'INTERVENTION</div>
                <div class='value'>$codePostal</div>
            </div>
            
            <div class='field urgent'>
                <div class='label'>🐭 TYPE DE PROBLÈME</div>
                <div class='value'><strong>$typeProbleme</strong></div>
            </div>
            
            <div class='field'>
                <div class='label'>💬 DÉTAILS CLIENT</div>
                <div class='message-box'>$message</div>
            </div>
        </div>
        <div class='footer'>
            <p><strong>📅 Reçu le " . date('d/m/Y à H:i:s') . "</strong></p>
            <p>🌐 Depuis le formulaire contact de www.3dassistance.fr</p>
            <p>⚡ <strong>Action requise :</strong> Recontacter sous 2h selon engagement</p>
            <hr>
            <p style='color: #666;'>Email automatique - Ne pas répondre à cet email</p>
        </div>
    </div>
</body>
</html>";

// Configuration SMTP OVH optimisée
ini_set('SMTP', 'ssl0.ovh.net');
ini_set('smtp_port', '587');
ini_set('sendmail_from', 'contact@3dassistance.fr');

// Headers optimisés pour éviter les spams
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: "3D Assistance - Site Web" <contact@3dassistance.fr>',
    'Reply-To: ' . $nom . ' <contact@3dassistance.fr>',
    'Return-Path: contact@3dassistance.fr',
    'X-Mailer: 3DAssistance-ContactForm-v2.0',
    'X-Priority: 1',
    'Importance: High',
    'X-MSMail-Priority: High',
    'Message-ID: <' . time() . '-' . md5($nom . $telephone) . '@3dassistance.fr>',
    'Date: ' . date('r')
];

// Log de la tentative
$log_entry = date('Y-m-d H:i:s') . " - CONTACT FORM: $nom ($telephone) - $typeProbleme\n";
error_log($log_entry, 3, 'contact_form.log');

// Tentative d'envoi
$mail_sent = mail($to, $subject, $html_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log de succès
    error_log("SUCCESS: Email envoyé pour $nom ($telephone) - $typeProbleme");
    
    // Réponse de succès
    echo json_encode([
        'success' => true, 
        'message' => 'Votre demande a été envoyée avec succès ! Nous vous recontactons sous 2h.',
        'timestamp' => date('Y-m-d H:i:s'),
        'contact_info' => [
            'nom' => $nom,
            'typeProbleme' => $typeProbleme
        ]
    ]);
} else {
    // Log d'erreur
    error_log("FAILURE: Échec envoi email pour $nom ($telephone) - $typeProbleme");
    
    // Réponse d'erreur
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur technique lors de l\'envoi. Veuillez appeler directement le 01 42 01 07 07.',
        'fallback_phone' => '01 42 01 07 07',
        'timestamp' => date('Y-m-d H:i:s')
    ]);
}

// Nettoyage mémoire
unset($html_body, $headers);
?>