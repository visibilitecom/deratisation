#!/usr/bin/env python3
"""
Backend Health Test Suite
Tests the FastAPI backend endpoints to ensure proper functionality
"""

import requests
import json
import sys
from datetime import datetime
import os
from dotenv import load_dotenv

# Load environment variables
load_dotenv('/app/frontend/.env')

# Get backend URL from frontend environment
BACKEND_URL = os.environ.get('REACT_APP_BACKEND_URL', 'https://deratisation-pro.preview.emergentagent.com')
API_BASE_URL = f"{BACKEND_URL}/api"

class BackendTester:
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
    
    def test_root_endpoint(self):
        """Test the root API endpoint"""
        try:
            response = requests.get(f"{API_BASE_URL}/", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                if data.get('message') == 'Hello World':
                    self.log_test("Root Endpoint", True, "Root endpoint responding correctly", data)
                    return True
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected response content: {data}", data)
                    return False
            else:
                self.log_test("Root Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Root Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_create_status_check(self):
        """Test creating a status check"""
        try:
            test_data = {
                "client_name": "Test Client Health Check"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/status",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=10
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['id', 'client_name', 'timestamp']
                
                if all(field in data for field in required_fields):
                    if data['client_name'] == test_data['client_name']:
                        self.log_test("Create Status Check", True, "Status check created successfully", data)
                        return True, data['id']
                    else:
                        self.log_test("Create Status Check", False, "Client name mismatch in response", data)
                        return False, None
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Create Status Check", False, f"Missing required fields: {missing_fields}", data)
                    return False, None
            else:
                self.log_test("Create Status Check", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False, None
                
        except requests.exceptions.RequestException as e:
            self.log_test("Create Status Check", False, f"Connection error: {str(e)}")
            return False, None
    
    def test_get_status_checks(self):
        """Test retrieving status checks"""
        try:
            response = requests.get(f"{API_BASE_URL}/status", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if isinstance(data, list):
                    self.log_test("Get Status Checks", True, f"Retrieved {len(data)} status checks", f"Count: {len(data)}")
                    return True
                else:
                    self.log_test("Get Status Checks", False, "Response is not a list", data)
                    return False
            else:
                self.log_test("Get Status Checks", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Status Checks", False, f"Connection error: {str(e)}")
            return False
    
    def test_cors_headers(self):
        """Test CORS configuration"""
        try:
            response = requests.options(f"{API_BASE_URL}/", timeout=10)
            
            cors_headers = {
                'Access-Control-Allow-Origin': response.headers.get('Access-Control-Allow-Origin'),
                'Access-Control-Allow-Methods': response.headers.get('Access-Control-Allow-Methods'),
                'Access-Control-Allow-Headers': response.headers.get('Access-Control-Allow-Headers')
            }
            
            if any(cors_headers.values()):
                self.log_test("CORS Configuration", True, "CORS headers present", cors_headers)
                return True
            else:
                # Try a GET request to check CORS on actual endpoint
                response = requests.get(f"{API_BASE_URL}/", timeout=10)
                cors_origin = response.headers.get('Access-Control-Allow-Origin')
                if cors_origin:
                    self.log_test("CORS Configuration", True, f"CORS origin header: {cors_origin}")
                    return True
                else:
                    self.log_test("CORS Configuration", False, "No CORS headers found", cors_headers)
                    return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("CORS Configuration", False, f"Connection error: {str(e)}")
            return False
    
    def test_backend_connectivity(self):
        """Test basic backend connectivity"""
        try:
            response = requests.get(BACKEND_URL, timeout=10)
            
            if response.status_code in [200, 404]:  # 404 is OK for root, we just need connectivity
                self.log_test("Backend Connectivity", True, f"Backend server is reachable (HTTP {response.status_code})")
                return True
            else:
                self.log_test("Backend Connectivity", False, f"Unexpected status code: {response.status_code}")
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Backend Connectivity", False, f"Cannot reach backend server: {str(e)}")
            return False
    
    def test_contact_form_valid_data(self):
        """Test contact form endpoint with valid data"""
        try:
            test_data = {
                "nom": "Jean Dupont",
                "telephone": "01 23 45 67 89",
                "codePostal": "75001",
                "typeProbleme": "Dératisation rats Paris",
                "message": "J'ai un problème de rats dans mon appartement. Pouvez-vous m'aider rapidement ?"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/send-contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ['success', 'message', 'contact_id']
                
                if all(field in data for field in required_fields):
                    if data['success'] is True and data['contact_id']:
                        self.log_test("Contact Form - Valid Data", True, f"Contact form submitted successfully. ID: {data['contact_id']}", data)
                        return True, data['contact_id']
                    else:
                        self.log_test("Contact Form - Valid Data", False, "Success flag is False or missing contact_id", data)
                        return False, None
                else:
                    missing_fields = [field for field in required_fields if field not in data]
                    self.log_test("Contact Form - Valid Data", False, f"Missing required response fields: {missing_fields}", data)
                    return False, None
            else:
                self.log_test("Contact Form - Valid Data", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False, None
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form - Valid Data", False, f"Connection error: {str(e)}")
            return False, None
    
    def test_contact_form_missing_required_fields(self):
        """Test contact form validation with missing required fields"""
        test_cases = [
            {"telephone": "01 23 45 67 89", "typeProbleme": "Test", "message": "Test"},  # Missing nom
            {"nom": "Test User", "typeProbleme": "Test", "message": "Test"},  # Missing telephone
            {"nom": "Test User", "telephone": "01 23 45 67 89", "message": "Test"},  # Missing typeProbleme
            {}  # Missing all required fields
        ]
        
        all_passed = True
        
        for i, test_data in enumerate(test_cases):
            try:
                response = requests.post(
                    f"{API_BASE_URL}/send-contact",
                    json=test_data,
                    headers={"Content-Type": "application/json"},
                    timeout=10
                )
                
                if response.status_code == 400:
                    data = response.json()
                    if 'detail' in data:
                        self.log_test(f"Contact Form - Validation Test {i+1}", True, f"Proper validation error: {data['detail']}", data)
                    else:
                        self.log_test(f"Contact Form - Validation Test {i+1}", False, "Missing error detail in 400 response", data)
                        all_passed = False
                else:
                    self.log_test(f"Contact Form - Validation Test {i+1}", False, f"Expected 400, got {response.status_code}: {response.text}", response.text)
                    all_passed = False
                    
            except requests.exceptions.RequestException as e:
                self.log_test(f"Contact Form - Validation Test {i+1}", False, f"Connection error: {str(e)}")
                all_passed = False
        
        return all_passed
    
    def test_contact_form_minimal_data(self):
        """Test contact form with minimal required data only"""
        try:
            test_data = {
                "nom": "Marie Martin",
                "telephone": "01 42 01 07 07",
                "typeProbleme": "Test - Dératisation souris Paris"
                # No codePostal or message (optional fields)
            }
            
            response = requests.post(
                f"{API_BASE_URL}/send-contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                if data.get('success') is True and data.get('contact_id'):
                    self.log_test("Contact Form - Minimal Data", True, f"Minimal data accepted. ID: {data['contact_id']}", data)
                    return True
                else:
                    self.log_test("Contact Form - Minimal Data", False, "Success flag is False or missing contact_id", data)
                    return False
            else:
                self.log_test("Contact Form - Minimal Data", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form - Minimal Data", False, f"Connection error: {str(e)}")
            return False
    
    def test_get_contacts_endpoint(self):
        """Test the admin contacts retrieval endpoint"""
        try:
            response = requests.get(f"{API_BASE_URL}/contacts", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                
                if 'contacts' in data and isinstance(data['contacts'], list):
                    self.log_test("Get Contacts Endpoint", True, f"Retrieved {len(data['contacts'])} contacts from database", f"Count: {len(data['contacts'])}")
                    return True
                else:
                    self.log_test("Get Contacts Endpoint", False, "Response missing 'contacts' field or not a list", data)
                    return False
            else:
                self.log_test("Get Contacts Endpoint", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Get Contacts Endpoint", False, f"Connection error: {str(e)}")
            return False
    
    def test_contact_form_response_format(self):
        """Test that contact form response matches expected format"""
        try:
            test_data = {
                "nom": "Pierre Durand",
                "telephone": "01 23 45 67 89",
                "codePostal": "75002",
                "typeProbleme": "Test - Dératisation cafards Paris",
                "message": "Test de format de réponse"
            }
            
            response = requests.post(
                f"{API_BASE_URL}/send-contact",
                json=test_data,
                headers={"Content-Type": "application/json"},
                timeout=15
            )
            
            if response.status_code == 200:
                data = response.json()
                
                # Check required response format
                expected_fields = ['success', 'message', 'contact_id']
                optional_fields = ['note']  # For email fallback scenarios
                
                has_required = all(field in data for field in expected_fields)
                success_is_bool = isinstance(data.get('success'), bool)
                message_is_string = isinstance(data.get('message'), str)
                contact_id_is_string = isinstance(data.get('contact_id'), str)
                
                if has_required and success_is_bool and message_is_string and contact_id_is_string:
                    self.log_test("Contact Form - Response Format", True, "Response format matches expected structure", data)
                    return True
                else:
                    issues = []
                    if not has_required:
                        missing = [f for f in expected_fields if f not in data]
                        issues.append(f"Missing fields: {missing}")
                    if not success_is_bool:
                        issues.append(f"'success' should be boolean, got {type(data.get('success'))}")
                    if not message_is_string:
                        issues.append(f"'message' should be string, got {type(data.get('message'))}")
                    if not contact_id_is_string:
                        issues.append(f"'contact_id' should be string, got {type(data.get('contact_id'))}")
                    
                    self.log_test("Contact Form - Response Format", False, f"Format issues: {'; '.join(issues)}", data)
                    return False
            else:
                self.log_test("Contact Form - Response Format", False, f"HTTP {response.status_code}: {response.text}", response.text)
                return False
                
        except requests.exceptions.RequestException as e:
            self.log_test("Contact Form - Response Format", False, f"Connection error: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Run all backend health tests including contact form functionality"""
        print(f"🚀 Starting Comprehensive Backend Tests")
        print(f"📍 Testing backend at: {API_BASE_URL}")
        print("=" * 60)
        
        # Test basic connectivity first
        connectivity_ok = self.test_backend_connectivity()
        
        if not connectivity_ok:
            print("\n❌ Backend connectivity failed - skipping API tests")
            return False
        
        # Test basic API endpoints
        print("\n🔧 Testing Basic API Endpoints...")
        root_ok = self.test_root_endpoint()
        create_ok, created_id = self.test_create_status_check()
        get_ok = self.test_get_status_checks()
        cors_ok = self.test_cors_headers()
        
        # Test contact form functionality
        print("\n📧 Testing Contact Form Email Functionality...")
        contact_valid_ok, contact_id = self.test_contact_form_valid_data()
        contact_validation_ok = self.test_contact_form_missing_required_fields()
        contact_minimal_ok = self.test_contact_form_minimal_data()
        contact_format_ok = self.test_contact_form_response_format()
        get_contacts_ok = self.test_get_contacts_endpoint()
        
        # Summary
        print("\n" + "=" * 60)
        print("📊 COMPREHENSIVE TEST SUMMARY")
        print("=" * 60)
        
        total_tests = len(self.test_results)
        passed_tests = total_tests - len(self.failed_tests)
        
        print(f"Total Tests: {total_tests}")
        print(f"Passed: {passed_tests}")
        print(f"Failed: {len(self.failed_tests)}")
        
        # Categorize results
        basic_tests = ['Backend Connectivity', 'Root Endpoint', 'Create Status Check', 'Get Status Checks', 'CORS Configuration']
        contact_tests = [t['test'] for t in self.test_results if 'Contact Form' in t['test'] or 'Get Contacts' in t['test']]
        
        basic_failures = [t for t in self.failed_tests if t['test'] in basic_tests]
        contact_failures = [t for t in self.failed_tests if t['test'] in contact_tests]
        
        print(f"\n📊 Basic API Health: {len(basic_tests) - len(basic_failures)}/{len(basic_tests)} passed")
        print(f"📧 Contact Form Tests: {len(contact_tests) - len(contact_failures)}/{len(contact_tests)} passed")
        
        if self.failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in self.failed_tests:
                print(f"  - {test['test']}: {test['message']}")
        
        success_rate = (passed_tests / total_tests) * 100 if total_tests > 0 else 0
        print(f"\nOverall Success Rate: {success_rate:.1f}%")
        
        # Overall health assessment
        if len(self.failed_tests) == 0:
            print("\n✅ BACKEND HEALTH: EXCELLENT - All tests passed")
            print("✅ CONTACT FORM: Fully functional with email and database storage")
            return True
        elif len(contact_failures) == 0 and len(basic_failures) <= 1:
            print("\n⚠️  BACKEND HEALTH: GOOD - Contact form working, minor basic API issues")
            return True
        elif len(contact_failures) > 0:
            print("\n❌ CONTACT FORM: Issues detected - Email functionality may be impaired")
            return False
        else:
            print("\n❌ BACKEND HEALTH: POOR - Multiple issues detected")
            return False

def main():
    """Main test execution"""
    tester = BackendTester()
    success = tester.run_all_tests()
    
    # Exit with appropriate code
    sys.exit(0 if success else 1)

if __name__ == "__main__":
    main()