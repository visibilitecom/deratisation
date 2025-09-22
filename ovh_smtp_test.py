#!/usr/bin/env python3
"""
OVH SMTP Email Functionality Test Suite
Tests the new OVH SMTP configuration for real email delivery
"""

import requests
import json
import sys
import smtplib
import socket
from datetime import datetime
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')
load_dotenv('/app/backend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://deratisation-pro.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

# OVH SMTP Configuration
SMTP_SERVER = os.environ.get('SMTP_SERVER', 'ssl0.ovh.net')
SMTP_PORT = int(os.environ.get('SMTP_PORT', '587'))
SMTP_USER = os.environ.get('SMTP_USER', 'contact@3dassistance.fr')
SMTP_PASSWORD = os.environ.get('SMTP_PASSWORD', '')

class OVHSMTPTester:
    def __init__(self):
        self.test_results = []
        self.failed_tests = []
        
    def log_test(self, test_name, success, message, response_data=None):
        """Log test results"""
        result = {
            'test': test_name,
            'success': success,
            'message': message,
            'timestamp': datetime.now().isoformat(),
            'response_data': response_data
        }
        self.test_results.append(result)
        
        if not success:
            self.failed_tests.append(result)
            
        status = "✅ PASS" if success else "❌ FAIL"
        print(f"{status} {test_name}: {message}")
        if response_data and not success:
            print(f"   Response: {response_data}")
    
    def test_smtp_server_connectivity(self):
        """Test basic connectivity to OVH SMTP server"""
        try:
            # Test socket connection to SMTP server
            sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
            sock.settimeout(10)
            result = sock.connect_ex((SMTP_SERVER, SMTP_PORT))
            sock.close()
            
            if result == 0:
                self.log_test("SMTP Server Connectivity", True, f"Successfully connected to {SMTP_SERVER}:{SMTP_PORT}")
                return True
            else:
                self.log_test("SMTP Server Connectivity", False, f"Cannot connect to {SMTP_SERVER}:{SMTP_PORT} - Error code: {result}")
                return False
                
        except Exception as e:
            self.log_test("SMTP Server Connectivity", False, f"Connection error: {str(e)}")
            return False
    
    def test_smtp_authentication(self):
        """Test SMTP authentication with OVH credentials"""
        try:
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.set_debuglevel(0)  # Set to 1 for debug output
            
            # Start TLS encryption
            server.starttls()
            
            # Attempt authentication
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.quit()
            
            self.log_test("SMTP Authentication", True, f"Successfully authenticated with {SMTP_USER}")
            return True
            
        except smtplib.SMTPAuthenticationError as e:
            self.log_test("SMTP Authentication", False, f"Authentication failed: {str(e)}")
            return False
        except Exception as e:
            self.log_test("SMTP Authentication", False, f"SMTP error: {str(e)}")
            return False
    
    def test_direct_email_send(self):
        """Test sending email directly through OVH SMTP"""
        try:
            # Create test email
            msg = MIMEMultipart('alternative')
            msg['Subject'] = "🧪 Test SMTP OVH - Configuration Test"
            msg['From'] = f"3D Assistance <{SMTP_USER}>"
            msg['To'] = SMTP_USER
            msg['Reply-To'] = SMTP_USER
            
            # Email content
            text_body = """
TEST SMTP OVH - Configuration Test

Ce message confirme que la configuration SMTP OVH fonctionne correctement.

Serveur: ssl0.ovh.net:587
Utilisateur: contact@3dassistance.fr
Statut: Configuration réussie ✅

---
Test envoyé le """ + datetime.now().strftime('%d/%m/%Y à %H:%M:%S')
            
            html_body = f"""
            <!DOCTYPE html>
            <html>
            <head>
                <meta charset='UTF-8'>
                <style>
                    body {{ font-family: Arial, sans-serif; line-height: 1.6; color: #333; }}
                    .container {{ max-width: 600px; margin: 0 auto; background: #ffffff; }}
                    .header {{ background: #1FA77D; color: white; padding: 25px; text-align: center; }}
                    .content {{ padding: 30px; background: #f9f9f9; }}
                    .success {{ background: #d4edda; border: 1px solid #c3e6cb; padding: 15px; border-radius: 5px; }}
                </style>
            </head>
            <body>
                <div class='container'>
                    <div class='header'>
                        <h1>🧪 Test SMTP OVH</h1>
                        <p>Configuration Test</p>
                    </div>
                    <div class='content'>
                        <div class='success'>
                            <h3>✅ Configuration SMTP Réussie</h3>
                            <p><strong>Serveur:</strong> {SMTP_SERVER}:{SMTP_PORT}</p>
                            <p><strong>Utilisateur:</strong> {SMTP_USER}</p>
                            <p><strong>Statut:</strong> Fonctionnel</p>
                            <p><strong>Test envoyé:</strong> {datetime.now().strftime('%d/%m/%Y à %H:%M:%S')}</p>
                        </div>
                    </div>
                </div>
            </body>
            </html>
            """
            
            # Attach parts
            part1 = MIMEText(text_body, 'plain', 'utf-8')
            part2 = MIMEText(html_body, 'html', 'utf-8')
            msg.attach(part1)
            msg.attach(part2)
            
            # Send email
            server = smtplib.SMTP(SMTP_SERVER, SMTP_PORT)
            server.starttls()
            server.login(SMTP_USER, SMTP_PASSWORD)
            server.send_message(msg)
            server.quit()
            
            self.log_test("Direct Email Send", True, f"Test email sent successfully to {SMTP_USER}")
            return True
            
        except Exception as e:
            self.log_test("Direct Email Send", False, f"Failed to send test email: {str(e)}")
            return False
    
    def test_contact_form_ovh_smtp(self):
        """Test contact form with OVH SMTP using the exact requested data"""
        try:
            test_data = {
                "nom": "Test SMTP OVH",
                "telephone": "01 42 01 07 07",
                "codePostal": "75001",
                "typeProbleme": "Test - Configuration SMTP OVH",
                "message": "Test d'envoi d'email via serveur SMTP OVH. Si vous recevez cet email, la configuration fonctionne parfaitement !"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/send-contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=30  # Longer timeout for email sending
            )
            
            if response.status_code == 200:
                data = response.json()
                
                if data.get('success') is True and data.get('contact_id'):
                    # Check if there's a note about email failure
                    if 'note' in data and 'attente' in data['note'].lower():
                        self.log_test("Contact Form OVH SMTP", False, f"Email failed but contact saved. Note: {data.get('note')}", data)
                        return False, data['contact_id']
                    else:
                        self.log_test("Contact Form OVH SMTP", True, f"Contact form submitted successfully with OVH SMTP. ID: {data['contact_id']}", data)
                        return True, data['contact_id']
                else:
                    self.log_test("Contact Form OVH SMTP", False, "Success flag is False or missing contact_id", data)
                    return False, None
            else:
                self.log_test("Contact Form OVH SMTP", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False, None
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form OVH SMTP", False, f"Connection error: {str(e)}")
            return False, None
    
    def test_email_status_verification(self, contact_id):
        """Verify that the contact was saved with 'email_sent' status"""
        if not contact_id:
            self.log_test("Email Status Verification", False, "No contact ID provided for verification")
            return False
            
        try:
            response = requests.get(f"{API_BASE_URL}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                contacts = data.get('contacts', [])
                
                # Find the contact by ID
                target_contact = None
                for contact in contacts:
                    if contact.get('id') == contact_id:
                        target_contact = contact
                        break
                
                if target_contact:
                    status = target_contact.get('status', 'unknown')
                    if status == 'email_sent':
                        self.log_test("Email Status Verification", True, f"Contact saved with status 'email_sent' ✅", {'status': status, 'contact_id': contact_id})
                        return True
                    elif status == 'email_failed':
                        error_msg = target_contact.get('error', 'No error details')
                        self.log_test("Email Status Verification", False, f"Contact saved with status 'email_failed' - Error: {error_msg}", {'status': status, 'error': error_msg})
                        return False
                    else:
                        self.log_test("Email Status Verification", False, f"Unexpected status: {status}", {'status': status})
                        return False
                else:
                    self.log_test("Email Status Verification", False, f"Contact with ID {contact_id} not found in database")
                    return False
            else:
                self.log_test("Email Status Verification", False, f"Failed to retrieve contacts: HTTP {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Email Status Verification", False, f"Error verifying email status: {str(e)}")
            return False
    
    def test_smtp_error_handling(self):
        """Test SMTP error handling with invalid credentials"""
        try:
            # Test with invalid password
            test_data = {
                "nom": "Test Error Handling",
                "telephone": "01 42 01 07 07",
                "typeProbleme": "Test - Error Handling",
                "message": "Testing SMTP error handling"
            }
            
            # Temporarily modify environment to test error handling
            original_password = os.environ.get('SMTP_PASSWORD')
            os.environ['SMTP_PASSWORD'] = 'invalid_password_test'
            
            response = requests.post(
                f"{API_BASE_URL}/send-contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            # Restore original password
            if original_password:
                os.environ['SMTP_PASSWORD'] = original_password
            
            if response.status_code == 200:
                data = response.json()
                
                # Should still succeed but with fallback behavior
                if data.get('success') is True and 'note' in data:
                    self.log_test("SMTP Error Handling", True, "Proper fallback behavior when SMTP fails", data)
                    return True
                else:
                    self.log_test("SMTP Error Handling", False, "Expected fallback behavior not found", data)
                    return False
            else:
                self.log_test("SMTP Error Handling", False, f"Unexpected response: HTTP {response.status_code}", response.text)
                return False
                
        except Exception as e:
            self.log_test("SMTP Error Handling", False, f"Error testing SMTP error handling: {str(e)}")
            return False
    
    def run_ovh_smtp_tests(self):
        """Run comprehensive OVH SMTP tests"""
        print(f"🚀 Starting OVH SMTP Configuration Tests")
        print(f"📧 SMTP Server: {SMTP_SERVER}:{SMTP_PORT}")
        print(f"👤 SMTP User: {SMTP_USER}")
        print(f"🌐 Backend API: {API_BASE_URL}")
        print("=" * 70)
        
        # Test SMTP infrastructure
        print("\n🔧 Testing SMTP Infrastructure...")
        connectivity_ok = self.test_smtp_server_connectivity()
        auth_ok = self.test_smtp_authentication()
        direct_email_ok = self.test_direct_email_send()
        
        # Test contact form integration
        print("\n📧 Testing Contact Form Integration...")
        contact_form_ok, contact_id = self.test_contact_form_ovh_smtp()
        status_ok = self.test_email_status_verification(contact_id)
        
        # Test error handling
        print("\n⚠️  Testing Error Handling...")
        error_handling_ok = self.test_smtp_error_handling()
        
        # Summary
        print("\n" + "=" * 70)
        print("📊 OVH SMTP TEST SUMMARY")
        print("=" * 70)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        
        # Categorize results
        smtp_tests = ['SMTP Server Connectivity', 'SMTP Authentication', 'Direct Email Send']
        integration_tests = ['Contact Form OVH SMTP', 'Email Status Verification']
        error_tests = ['SMTP Error Handling']
        
        smtp_failures = [t for t in self.failed_tests if t['test'] in smtp_tests]
        integration_failures = [t for t in self.failed_tests if t['test'] in integration_tests]
        error_failures = [t for t in self.failed_tests if t['test'] in error_tests]
        
        print(f"\n🔧 SMTP Infrastructure: {len(smtp_tests) - len(smtp_failures)}/{len(smtp_tests)} passed")
        print(f"📧 Contact Form Integration: {len(integration_tests) - len(integration_failures)}/{len(integration_tests)} passed")
        print(f"⚠️  Error Handling: {len(error_tests) - len(error_failures)}/{len(error_tests)} passed")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nOverall Success Rate: {success_rate:.1f}%")
        
        # Critical assessment
        critical_failures = len(smtp_failures) + len(integration_failures)
        
        if critical_failures == 0:
            print("\n✅ OVH SMTP STATUS: FULLY FUNCTIONAL")
            print("✅ Real emails are being sent to contact@3dassistance.fr")
            print("✅ Contact form integration working perfectly")
            return True
        elif len(smtp_failures) > 0:
            print("\n❌ OVH SMTP STATUS: INFRASTRUCTURE ISSUES")
            print("❌ SMTP server connection or authentication problems")
            print("❌ Real emails are NOT being sent")
            return False
        elif len(integration_failures) > 0:
            print("\n⚠️  OVH SMTP STATUS: INTEGRATION ISSUES")
            print("⚠️  SMTP works but contact form integration has problems")
            return False
        else:
            print("\n✅ OVH SMTP STATUS: WORKING WITH MINOR ISSUES")
            return True

def main():
    """Main test execution"""
    print("🧪 OVH SMTP Email Functionality Test Suite")
    print("Testing real email delivery through OVH SMTP server")
    print("=" * 70)
    
    tester = OVHSMTPTester()
    success = tester.run_ovh_smtp_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()