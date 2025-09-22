<?php
// Script d'envoi d'emails pour 3dassistance.fr
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.3dassistance.fr');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Gestion des requêtes OPTIONS (CORS preflight)
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Vérification de la méthode POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

// Récupération et validation des données
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
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

// Nettoyage et sécurisation des données
$nom = filter_var(trim($input['nom']), FILTER_SANITIZE_STRING);
$telephone = filter_var(trim($input['telephone']), FILTER_SANITIZE_STRING);
$codePostal = filter_var(trim($input['codePostal'] ?? ''), FILTER_SANITIZE_STRING);
$typeProbleme = filter_var(trim($input['typeProbleme']), FILTER_SANITIZE_STRING);
$message = filter_var(trim($input['message'] ?? ''), FILTER_SANITIZE_STRING);

// Configuration email
$to = 'contact@3dassistance.fr';
$subject = 'Nouvelle demande de devis - ' . $typeProbleme;

// Corps du message HTML
$html_body = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #1FA77D; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #1FA77D; }
        .value { margin-left: 10px; }
        .footer { padding: 20px; text-align: center; font-size: 12px; color: #666; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h2>🎯 Nouvelle demande de devis</h2>
            <p>3dassistance.fr</p>
        </div>
        <div class='content'>
            <div class='field'>
                <span class='label'>👤 Nom :</span>
                <span class='value'>$nom</span>
            </div>
            <div class='field'>
                <span class='label'>📞 Téléphone :</span>
                <span class='value'>$telephone</span>
            </div>
            <div class='field'>
                <span class='label'>📍 Code postal :</span>
                <span class='value'>" . ($codePostal ?: 'Non précisé') . "</span>
            </div>
            <div class='field'>
                <span class='label'>🐭 Type de problème :</span>
                <span class='value'>$typeProbleme</span>
            </div>
            <div class='field'>
                <span class='label'>💬 Message :</span>
                <div style='margin-top: 10px; padding: 15px; background: white; border-left: 4px solid #1FA77D;'>
                    " . ($message ?: 'Aucun message supplémentaire') . "
                </div>
            </div>
        </div>
        <div class='footer'>
            <p>📅 Reçu le " . date('d/m/Y à H:i') . "</p>
            <p>🌐 Depuis www.3dassistance.fr</p>
        </div>
    </div>
</body>
</html>
";

// Corps du message texte (fallback)
$text_body = "
Nouvelle demande de devis - 3dassistance.fr

Nom : $nom
Téléphone : $telephone
Code postal : " . ($codePostal ?: 'Non précisé') . "
Type de problème : $typeProbleme

Message :
" . ($message ?: 'Aucun message supplémentaire') . "

---
Reçu le " . date('d/m/Y à H:i') . "
Depuis www.3dassistance.fr
";

// Headers pour un email HTML professionnel
$headers = array(
    'MIME-Version: 1.0',
    'Content-Type: multipart/alternative; boundary="boundary-' . md5(time()) . '"',
    'From: "Site 3D Assistance" <noreply@3dassistance.fr>',
    'Reply-To: ' . $nom . ' <contact@3dassistance.fr>',
    'Return-Path: noreply@3dassistance.fr',
    'X-Mailer: PHP/' . phpversion(),
    'X-Priority: 1',
    'X-MSMail-Priority: High',
    'Importance: High'
);

$boundary = 'boundary-' . md5(time());

// Message multipart (texte + HTML)
$multipart_body = "
--$boundary
Content-Type: text/plain; charset=UTF-8
Content-Transfer-Encoding: 8bit

$text_body

--$boundary
Content-Type: text/html; charset=UTF-8
Content-Transfer-Encoding: 8bit

$html_body

--$boundary--
";

// Tentative d'envoi
$mail_sent = mail($to, $subject, $multipart_body, implode("\r\n", $headers));

if ($mail_sent) {
    // Log de succès
    error_log("Email envoyé avec succès pour $nom ($telephone) - $typeProbleme");
    
    echo json_encode([
        'success' => true, 
        'message' => 'Email envoyé avec succès!'
    ]);
} else {
    // Log d'erreur
    error_log("Échec envoi email pour $nom ($telephone) - $typeProbleme");
    
    http_response_code(500);
    echo json_encode([
        'success' => false, 
        'message' => 'Erreur lors de l\'envoi. Veuillez réessayer.'
    ]);
}
?>