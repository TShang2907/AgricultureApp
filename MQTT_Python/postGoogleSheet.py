import requests

# Đường dẫn đến Google Sheets
sheet_id = '1qO1gqFsBra6mbL7lR1GeKLbJBeAL10zf1mfkAdoFPk0'
sheet_range = 'RealData!A17:K18'  # Thay Sheet1 bằng tên sheet bạn muốn truy xuất
# API key
api_key = 'AIzaSyCGQxAPIFmR03S3CbNDtulHhxfdAQNmTbM'   # Lấy tại Google Cloud -->API_KEY
# Dữ liệu bạn muốn ghi lên Google Sheets
data_to_write = {
  "range": "RealData!A17:K18",
  "majorDimension": "ROWS",
  "values": [
    [
      1713929117,
      "24/04/2024 10:25:17",
      33,
      62.6,
      31.5,
      24.4,
      6.8,
      23,
      1,
      2,
      5
    ],
    [
      1713929117,
      "24/04/2024 10:25:17",
      33,
      62.6,
      31.5,
      24.4,
      6.8,
      23,
      1,
      2,
      5
    ]
    
  ]
}

url = f'https://sheets.googleapis.com/v4/spreadsheets/{sheet_id}/values/{sheet_range}?key={api_key}&valueInputOption=USER_ENTERED'
# Gửi yêu cầu POST để ghi dữ liệu lên Google Sheets
response_post = requests.post(url, json=data_to_write)
if response_post.status_code == 200:
    print('Dữ liệu đã được ghi thành công vào Google Sheets.')
else:
    print('Có lỗi xảy ra khi ghi dữ liệu vào Google Sheets:', response_post.status_code)

