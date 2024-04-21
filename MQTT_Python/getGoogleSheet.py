import requests

# Đường dẫn đến Google Sheets
sheet_id = '1A1V1pnv-MvBhynMW7rBfc0m5X6Cc3QmOssjgjzMl8j0'
sheet_range = 'Trang tính2!C1:K12'  # Thay Sheet1 bằng tên sheet bạn muốn truy xuất

# API key
api_key = 'AIzaSyCGQxAPIFmR03S3CbNDtulHhxfdAQNmTbM'   # Lấy tại Google Cloud -->API_KEY
parameter_1='majorDimension=ROWS'
parameter_2='valueRenderOption=FORMULA'

# URL để truy cập Google Sheets API
# Test tại Google Developer -->Sheet
url = f'https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/{sheet_range}?key={api_key}&{parameter_1}&{parameter_2}'

# Gửi yêu cầu GET để truy xuất dữ liệu
response = requests.get(url)

if response.status_code == 200:
    data = response.json().get('values', [])
    print(data);
else:
    print('Error:', response.status_code)
