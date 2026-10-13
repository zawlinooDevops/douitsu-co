# Section 4: Contact & Inquiries (お問い合わせ)

- **Section ID**: `#section_4`
- **CSS Classes**: `contact section-padding`

## Associated Images (ချိတ်ဆက်ထားသော ရုပ်ပုံ)
- **Contact Title Avatar Badge**:
  - **Local Path**: `raw-data/images/landing/contact-laptop.jpg`
  - **Original Path**: `assets/templates/douitsu/images/aerial-view-man-using-computer-laptop-wooden-table.jpg`
  - **Classes**: `avatar-image img-fluid`

## Contact Details (ဆက်သွယ်ရန် အချက်အလက်များ)

### Heading (ခေါင်းစဉ်)
```
お問い合わせ
(ဆက်သွယ်မေးမြန်းရန်)
```

### Quick Menu Links
- 特定技能
- 内容サビース

### Social Media Links
- Twitter (`bi-twitter`)
- Instagram (`bi-instagram`)
- Pinterest (`bi-pinterest`)
- YouTube (`bi-youtube`)

### Office Address (လိပ်စာ)
- **Japanese**: 東京都清瀬市元町1-11-21 フローレス元町205号
- **English**: Flawless Motomachi 205, 1-11-21 Motomachi, Kiyose-shi, Tokyo, Japan
- **Pin Point**: Kiyose Station, Tokyo

### Email (အီးမေးလ်)
- **Original Decoded Email**: `info@douitsu-co.com`
- (Cloudflare Obfuscation: `__cf_email__ data-cfemail="acc5c2cac3ecc8c3d9c5d8dfd981cfc382cfc3c1"`)

### Telephone (ဖုန်းနံပါတ်)
- **Phone**: `042-497-1537`
- **Link**: `tel:042-497-1537`

---

## Contact Form Specification (ဆက်သွယ်ရန် ဖောင်ဖွဲ့စည်းပုံ)
- **Form ID**: `#contact` (Container `#form2020`)
- **Action**: `/` (POST)
- **Hidden Input**: `name="formid" value="ContactForm"`
- **Form Fields**:
  1. **名前 (Name)**: `<input type="text" name="name" required>`
  2. **Eメール (Email)**: `<input type="email" name="email" pattern="[^ @]*@[^ @]*" required>`
  3. **電話 (Phone)**: `<input type="text" name="phone" required>`
  4. **メッセージ (Message)**: `<textarea name="message"></textarea>`
  5. **Honeypot Anti-Spam Field**: `<input type="text" name="fax" style="display:none">`
  6. **Google reCAPTCHA v2**: Sitekey `6LcsMIorAAAAAIuZp_TVu9-3xcTQQWWObtYPzaLW`
  7. **Submit Button (送信)**: `<button type="submit">送信</button>`
