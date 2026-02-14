# 🎁 GiftBox - Send Love Wrapped in Joy

Send virtual gift bundles with personalized messages via email!

## 🚀 Quick Setup (5 minutes)

### 1. Get Your Files
Download all files and keep them together in one folder.

### 2. Set Up EmailJS (FREE - 200 emails/month)

**Step 1:** Go to [emailjs.com](https://www.emailjs.com/) and sign up

**Step 2:** Create your email service
- Dashboard → Email Services → Add Service
- Choose Gmail (easiest)
- Connect your account
- Copy your **Service ID** (looks like `service_abc123`)

**Step 3:** Create email template
- Dashboard → Email Templates → Create New
- Template variables needed: `from_name`, `gifts`, `message`
- Copy your **Template ID** (looks like `template_xyz789`)

**Step 4:** Get your Public Key
- Dashboard → Account → Public Key
- Copy it (looks like `a1b2c3d4e5f6g7h8`)

### 3. Configure Your App

**Copy and rename the config file:**
```bash
cp config.example.js config.js
```

**Edit `config.js` with your credentials:**
```javascript
const CONFIG = {
    EMAILJS_PUBLIC_KEY: 'a1b2c3d4e5f6g7h8',      // Your actual key
    EMAILJS_SERVICE_ID: 'service_abc123',          // Your service
    EMAILJS_TEMPLATE_ID: 'template_xyz789'         // Your template
};
```

### 4. Test Locally

Just open `index.html` in your browser - that's it! 🎉

## 🌐 Deploy to GitHub Pages

### Step 1: Create Repository
1. Go to [github.com/new](https://github.com/new)
2. Name it: `giftbox`
3. Make it **Public**
4. Don't add README, .gitignore (we have them)

### Step 2: Upload Your Code

**Option A: GitHub UI (Easiest)**
1. Click "uploading an existing file"
2. Drag ALL files INCLUDING `config.js`
3. Commit changes

**Option B: Command Line**
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/giftbox.git
git push -u origin main
```

### Step 3: Enable GitHub Pages
1. Repository → Settings → Pages
2. Source: Deploy from `main` branch
3. Save
4. Your site: `https://YOUR_USERNAME.github.io/giftbox`

### Step 4: Secure Your Deployment

**IMPORTANT:** Restrict your EmailJS keys to your domain only

1. Go to EmailJS Dashboard → Account → Security
2. Add **Allowed Domains:**
   ```
   YOUR_USERNAME.github.io
   localhost
   ```

Now your keys only work from YOUR website! ✅

## ⚠️ Security Note

**Q: Is it safe to have config.js on GitHub?**

**A: YES, because:**
- EmailJS keys are **frontend** keys (designed to be public)
- You restrict them to YOUR domain only
- Even if someone copies them, they won't work on their site
- You can rotate keys anytime for free

**This is different from backend API keys (which should NEVER be public!)**

## 📧 Email Template (For EmailJS)

Copy this into your EmailJS template:

**Subject:**
```
{{from_name}} sent you a GiftBox! 💝
```

**HTML Body:**
```html
<div style="font-family: Arial; background: #f5f0eb; padding: 20px;">
  <div style="max-width: 500px; margin: 0 auto; background: white; border-radius: 20px; padding: 40px;">
    <div style="text-align: center; font-size: 80px;">💝</div>
    <h1 style="color: #e07b9f; text-align: center;">You Received a GiftBox!</h1>
    <p>From: <strong>{{from_name}}</strong></p>
    
    <div style="background: #fef5f0; padding: 20px; border-radius: 15px; margin: 20px 0;">
      <strong>Your Virtual Gifts:</strong>
      <div>{{gifts}}</div>
    </div>
    
    <div style="background: #fce4ec; border: 2px solid #f8bbd0; border-radius: 15px; padding: 20px; font-style: italic;">
      "{{message}}"
      <div style="text-align: right; margin-top: 10px;">— {{from_name}}</div>
    </div>
  </div>
</div>
```

## 🎯 File Structure

```
giftbox/
├── index.html           # Main page
├── styles.css           # Styling
├── script.js            # Logic
├── config.js            # Your EmailJS keys (keep private locally)
├── config.example.js    # Template (share this)
├── .gitignore          # What to ignore
└── README.md           # This file
```

## 🐛 Troubleshooting

**"CONFIG is not defined"**
- Make sure `config.js` exists
- Check it's loaded in HTML before `script.js`

**Emails not arriving**
- Check spam folder
- Verify credentials in EmailJS dashboard
- Check browser console for errors

**Domain restriction error**
- Add your domain to EmailJS Security settings

## 💰 Costs

- **Development:** FREE
- **Hosting (GitHub Pages):** FREE
- **Emails (EmailJS):** 
  - 0-200/month: FREE
  - 201-1000/month: $10/month
  - More: See [emailjs.com/pricing](https://www.emailjs.com/pricing)

## 🚀 What to Do Next

1. ✅ Test locally
2. ✅ Deploy to GitHub Pages
3. ✅ Restrict domain in EmailJS
4. ✅ Share with friends!
5. ✅ Post on LinkedIn 😉

## 📝 License

MIT - Use it however you want!

---

**Made with ❤️ for Valentine's Day**