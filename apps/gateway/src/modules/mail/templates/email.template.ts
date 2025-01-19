export const EMAIL_TEMPLATE = (user: any, url: string, logoUrl: string) => `
<!DOCTYPE html>
<html>
<head>
    <title>Email Confirmation</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            margin: 0;
            padding: 20px;
        }
        .container {
            max-width: 600px;
            margin: 0 auto;
            background-color: #f9f9f9;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .header {
            text-align: center;
            margin-bottom: 30px;
        }
        .logo {
            max-width: 150px;
            margin-bottom: 20px;
        }
        .button {
            display: inline-block;
            padding: 12px 24px;
            background-color: #4CAF50;
            color: white !important;
            text-decoration: none;
            border-radius: 4px;
            margin: 20px 0;
        }
        .footer {
            margin-top: 30px;
            text-align: center;
            font-size: 12px;
            color: #666;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <img src="${logoUrl}" alt="3DHUB Logo" class="logo">
            <h2>Welcome to 3DHUB!</h2>
        </div>
        
        <p>Hello ${user.name},</p>
        <p>Thank you for registering with 3DHUB. To complete your registration, please click the button below:</p>
        
        <div style="text-align: center;">
            <a href="${url}" class="button">Confirm Email</a>
        </div>
        
        <p>If you didn't create an account with us, you can safely ignore this email.</p>
        
        <div class="footer">
            <p>This is an automated message, please do not reply to this email.</p>
            <p>&copy; 2024 3DHUB. All rights reserved.</p>
        </div>
    </div>
</body>
</html>`; 