<?php
// Script de test pour vérifier la configuration email 3dassistance.fr
echo "<!DOCTYPE html>";
echo "<html><head><meta charset='UTF-8'><title>Test Contact - 3dassistance.fr</title>";
echo "<style>body{font-family:Arial,sans-serif;max-width:800px;margin:40px auto;padding:20px;line-height:1.6;}
.success{background:#d4edda;border:1px solid #c3e6cb;padding:15px;border-radius:5px;color:#155724;margin:10px 0;}
.error{background:#f8d7da;border:1px solid #f5c6cb;padding:15px;border-radius:5px;color:#721c24;margin:10px 0;}
.info{background:#d1ecf1;border:1px solid #bee5eb;padding:15px;border-radius:5px;color:#0c5460;margin:10px 0;}
h1{color:#1FA77D;}h2{color:#333;border-bottom:2px solid #1FA77D;padding-bottom:5px;}
.test-item{margin:15px 0;padding:10px;border-left:4px solid #1FA77D;background:#f8f9fa;}
</style></head><body>";

echo "<h1>🧪 Test Configuration Email - 3dassistance.fr</h1>";
echo "<p><strong>Test effectué le :</strong> " . date('d/m/Y à H:i:s') . "</p>";

// 1. Test de la fonction mail()
echo "<h2>1. Fonction mail() PHP</h2>";
if (function_exists('mail')) {
    echo "<div class='success'>✅ Fonction mail() disponible</div>";
} else {
    echo "<div class='error'>❌ Fonction mail() non disponible</div>";
}

// 2. Configuration serveur
echo "<h2>2. Configuration Serveur</h2>";
echo "<div class='test-item'>";
echo "<strong>📧 Sendmail path:</strong> " . ini_get('sendmail_path') . "<br>";
echo "<strong>📧 SMTP:</strong> " . ini_get('SMTP') . "<br>";
echo "<strong>📧 SMTP Port:</strong> " . ini_get('smtp_port') . "<br>";
echo "<strong>📧 Sendmail from:</strong> " . ini_get('sendmail_from') . "<br>";
echo "<strong>🐘 Version PHP:</strong> " . phpversion() . "<br>";
echo "<strong>🌐 Serveur:</strong> " . $_SERVER['SERVER_SOFTWARE'] . "<br>";
echo "</div>";

// 3. Test d'envoi réel
echo "<h2>3. Test d'Envoi Email</h2>";

$test_subject = "🧪 Test Email Production - " . date('H:i');
$test_message = "
<!DOCTYPE html>
<html>
<head>
    <meta charset='UTF-8'>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; background: #ffffff; }
        .header { background: #1FA77D; color: white; padding: 25px; text-align: center; }
        .content { padding: 30px; background: #f9f9f9; }
        .success { background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; }
    </style>
</head>
<body>
    <div class='container'>
        <div class='header'>
            <h1>🧪 Test Email Production</h1>
            <p>3dassistance.fr</p>
        </div>
        <div class='content'>
            <div class='success'>
                <h3>✅ Configuration Email Fonctionnelle</h3>
                <p><strong>Site:</strong> www.3dassistance.fr</p>
                <p><strong>Script:</strong> send-contact.php</p>
                <p><strong>SMTP:</strong> ssl0.ovh.net:587</p>
                <p><strong>Email:</strong> contact@3dassistance.fr</p>
                <p><strong>Test envoyé:</strong> " . date('d/m/Y à H:i:s') . "</p>
            </div>
            <hr>
            <p><strong>Status:</strong> Le formulaire de contact est prêt à recevoir les demandes clients !</p>
        </div>
    </div>
</body>
</html>
";

// Configuration headers optimaux
$headers = [
    'MIME-Version: 1.0',
    'Content-Type: text/html; charset=UTF-8',
    'From: "3D Assistance - Test" <contact@3dassistance.fr>',
    'Reply-To: contact@3dassistance.fr',
    'Return-Path: contact@3dassistance.fr',
    'X-Mailer: 3DAssistance-Test-v2.0',
    'Date: ' . date('r')
];

// Configuration SMTP OVH
ini_set('SMTP', 'ssl0.ovh.net');
ini_set('smtp_port', '587');
ini_set('sendmail_from', 'contact@3dassistance.fr');

// Tentative d'envoi
$mail_result = mail('contact@3dassistance.fr', $test_subject, $test_message, implode("\r\n", $headers));

if ($mail_result) {
    echo "<div class='success'>✅ <strong>Email de test envoyé avec succès !</strong><br>";
    echo "📧 Vérifiez votre boîte contact@3dassistance.fr<br>";
    echo "⏰ Email envoyé à " . date('H:i:s') . "</div>";
} else {
    echo "<div class='error'>❌ <strong>Échec de l'envoi du test</strong><br>";
    echo "🔧 Vérifiez la configuration SMTP OVH</div>";
}

// 4. Test de connectivité SMTP
echo "<h2>4. Test Connectivité SMTP OVH</h2>";
$smtp_test = @fsockopen('ssl0.ovh.net', 587, $errno, $errstr, 10);
if ($smtp_test) {
    echo "<div class='success'>✅ Connexion SMTP ssl0.ovh.net:587 : <strong>OK</strong></div>";
    fclose($smtp_test);
} else {
    echo "<div class='error'>❌ Connexion SMTP : <strong>ÉCHEC</strong> ($errno: $errstr)</div>";
}

// 5. Vérification du script contact
echo "<h2>5. Test Script Contact Form</h2>";
if (file_exists('send-contact.php')) {
    echo "<div class='success'>✅ Script send-contact.php présent</div>";
} else {
    echo "<div class='error'>❌ Script send-contact.php manquant</div>";
}

// 6. Recommandations finales
echo "<h2>6. Recommandations</h2>";
echo "<div class='info'>";
echo "<strong>📋 Pour optimiser la délivrabilité :</strong><br><br>";
echo "1. ✅ Vérifier les enregistrements SPF/DKIM du domaine<br>";
echo "2. ✅ S'assurer que ssl0.ovh.net est autorisé<br>";
echo "3. ✅ Tester régulièrement avec différents clients email<br>";
echo "4. ✅ Surveiller les logs pour détecter les problèmes<br>";
echo "5. ✅ Considérer un service de monitoring email<br>";
echo "</div>";

echo "<hr>";
echo "<p><strong>🎯 Conclusion :</strong> ";
if ($mail_result && file_exists('send-contact.php')) {
    echo "<span style='color:#155724;font-weight:bold;'>Configuration opérationnelle ! Le formulaire de contact est prêt.</span>";
} else {
    echo "<span style='color:#721c24;font-weight:bold;'>Configuration à vérifier. Voir les erreurs ci-dessus.</span>";
}
echo "</p>";

echo "<p><strong>Test terminé le " . date('Y-m-d H:i:s') . "</strong></p>";
echo "</body></html>";
?>