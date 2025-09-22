<?php
// Script SMTP pour envoi d'emails fiable
require_once 'phpmailer/Exception.php';
require_once 'phpmailer/PHPMailer.php';
require_once 'phpmailer/SMTP.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\SMTP;
use PHPMailer\PHPMailer\Exception;

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://www.3dassistance.fr');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'message' => 'Méthode non autorisée']);
    exit();
}

$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    http_response_code(400);
    echo json_encode(['success' => false, 'message' => 'Données invalides']);
    exit();
}

// Validation
$required_fields = ['nom', 'telephone', 'typeProbleme'];
foreach ($required_fields as $field) {
    if (empty($input[$field])) {
        http_response_code(400);
        echo json_encode(['success' => false, 'message' => "Le champ '$field' est obligatoire"]);
        exit();
    }
}

$nom = filter_var(trim($input['nom']), FILTER_SANITIZE_STRING);
$telephone = filter_var(trim($input['telephone']), FILTER_SANITIZE_STRING);
$codePostal = filter_var(trim($input['codePostal'] ?? ''), FILTER_SANITIZE_STRING);
$typeProbleme = filter_var(trim($input['typeProbleme']), FILTER_SANITIZE_STRING);
$message = filter_var(trim($input['message'] ?? ''), FILTER_SANITIZE_STRING);

try {
    $mail = new PHPMailer(true);

    // Configuration SMTP Cloudways
    $mail->isSMTP();
    $mail->Host       = 'localhost'; // ou smtp.3dassistance.fr
    $mail->SMTPAuth   = true;
    $mail->Username   = 'noreply@3dassistance.fr';
    $mail->Password   = 'your_smtp_password';
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = 587;

    // Expéditeur et destinataire
    $mail->setFrom('noreply@3dassistance.fr', '3D Assistance - Site Web');
    $mail->addAddress('contact@3dassistance.fr', '3D Assistance');
    $mail->addReplyTo('contact@3dassistance.fr', $nom);

    // Contenu
    $mail->isHTML(true);
    $mail->CharSet = 'UTF-8';
    $mail->Subject = 'Nouvelle demande de devis - ' . $typeProbleme;
    
    $mail->Body = "
    <div style='font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;'>
        <div style='background: #1FA77D; color: white; padding: 20px; text-align: center;'>
            <h2>🎯 Nouvelle demande de devis</h2>
            <p>3dassistance.fr</p>
        </div>
        <div style='padding: 20px; background: #f9f9f9;'>
            <p><strong>👤 Nom :</strong> $nom</p>
            <p><strong>📞 Téléphone :</strong> $telephone</p>
            <p><strong>📍 Code postal :</strong> " . ($codePostal ?: 'Non précisé') . "</p>
            <p><strong>🐭 Type de problème :</strong> $typeProbleme</p>
            <div style='margin-top: 20px;'>
                <strong>💬 Message :</strong>
                <div style='background: white; padding: 15px; margin-top: 10px; border-left: 4px solid #1FA77D;'>
                    " . ($message ?: 'Aucun message supplémentaire') . "
                </div>
            </div>
        </div>
        <div style='padding: 20px; text-align: center; font-size: 12px; color: #666;'>
            <p>📅 Reçu le " . date('d/m/Y à H:i') . "</p>
            <p>🌐 Depuis www.3dassistance.fr</p>
        </div>
    </div>";

    $mail->AltBody = "Nouvelle demande de devis\n\nNom: $nom\nTéléphone: $telephone\nCode postal: " . ($codePostal ?: 'Non précisé') . "\nType: $typeProbleme\nMessage: " . ($message ?: 'Aucun message');

    $mail->send();
    
    error_log("Email SMTP envoyé avec succès pour $nom");
    echo json_encode(['success' => true, 'message' => 'Email envoyé avec succès!']);

} catch (Exception $e) {
    error_log("Erreur SMTP: {$mail->ErrorInfo}");
    http_response_code(500);
    echo json_encode(['success' => false, 'message' => 'Erreur lors de l\'envoi: ' . $mail->ErrorInfo]);
}
?>