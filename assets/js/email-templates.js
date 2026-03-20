'use strict';

/**
 * createEmailTemplate(type, data)
 * Returns { subject, html } for the given email type.
 *
 * Supported types: 'welcome', 'access_granted', 'access_denied'
 * data: { name, email }
 */
function createEmailTemplate(type, data) {
  var name = data.name || '';

  var configs = {
    welcome: {
      subject: 'ברוך הבא ל-NewGen Finance! 🎉',
      title: 'ברוך הבא!',
      preheader: 'שמחים שהצטרפת — הנה מה שמחכה לך',
      body: 'היי ' + name + ',<br><br>שמחים שהצטרפת! 🙌<br><br>יצרנו לך חשבון אישי באתר. מכאן תוכל לגשת לכלים הפיננסיים שלנו — מחשבון הבריאות הפיננסית, כלי הניתוח, ועוד.<br><br>אם תרצה גישה לקורס ההשקעות המלא, תוכל לבקש אותה ישירות מהפרופיל שלך.',
      btnText: 'לאזור האישי שלי',
      btnUrl: 'https://newgenfinance.co.il/members/',
    },
    access_granted: {
      subject: 'הגישה לקורס אושרה! 🚀',
      title: 'הגישה אושרה!',
      preheader: 'מוכן להתחיל? הקורס מחכה לך',
      body: 'היי ' + name + ',<br><br>אישרתי לך גישה ל-Investor Academy! 🎉<br><br>הקורס בנוי מ-4 שלבים — החל מהבסיס של שוק ההון, דרך אסטרטגיית השקעות ערך, וכלה בכלים טכנולוגיים לניתוח מניות.<br><br>תתחיל מהפרק הראשון ותתקדם בקצב שלך.',
      btnText: 'התחל ללמוד עכשיו →',
      btnUrl: 'https://newgenfinance.co.il/investor-academy/lessons/chapter-1.html',
    },
    access_denied: {
      subject: 'עדכון לגבי בקשת הגישה שלך',
      title: 'עדכון על בקשתך',
      preheader: 'עדכון קצר על הבקשה שלך',
      body: 'היי ' + name + ',<br><br>תודה על הסבלנות.<br><br>בדקתי את הבקשה שלך, ולצערי לא יכולתי לאשר אותה בשלב הזה.<br><br>אם אתה חושב שזו טעות, או שיש לך שאלות — פשוט תשיב למייל הזה ואני אבדוק מחדש.',
      btnText: 'שלח לי הודעה',
      btnUrl: 'mailto:yair@newgenfinance.co.il',
    },
  };

  var cfg = configs[type];
  if (!cfg) throw new Error('Unknown email type: ' + type);

  var html = '<!DOCTYPE html>\n' +
'<html dir="rtl" lang="he">\n' +
'<head>\n' +
'  <meta charset="UTF-8">\n' +
'  <meta name="viewport" content="width=device-width,initial-scale=1.0">\n' +
'  <title>' + cfg.subject + '</title>\n' +
'</head>\n' +
'<body style="margin:0;padding:0;background-color:#f4f0ed;font-family:Arial,Helvetica,sans-serif;direction:rtl;">\n' +
'\n' +
'  <!-- Preheader (hidden preview text) -->\n' +
'  <div style="display:none;max-height:0;overflow:hidden;color:#f4f0ed;font-size:1px;">' + cfg.preheader + '</div>\n' +
'\n' +
'  <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation"\n' +
'         style="background-color:#f4f0ed;padding:40px 16px;">\n' +
'    <tr>\n' +
'      <td align="center">\n' +
'\n' +
'        <!-- Wrapper -->\n' +
'        <table width="100%" cellpadding="0" cellspacing="0" border="0" role="presentation"\n' +
'               style="max-width:560px;">\n' +
'\n' +
'          <!-- ── HEADER ── -->\n' +
'          <tr>\n' +
'            <td style="background-color:#394140;padding:28px 36px;text-align:center;\n' +
'                       border-radius:16px 16px 0 0;">\n' +
'              <span style="font-size:22px;font-weight:800;color:#ffffff;\n' +
'                           letter-spacing:-0.3px;direction:ltr;display:inline-block;">\n' +
'                NewGen&#8202;<span style="color:#5e817d;">Finance</span>\n' +
'              </span>\n' +
'            </td>\n' +
'          </tr>\n' +
'\n' +
'          <!-- ── CONTENT ── -->\n' +
'          <tr>\n' +
'            <td style="background-color:#ffffff;padding:40px 36px 32px;">\n' +
'\n' +
'              <h1 style="margin:0 0 18px;font-size:22px;font-weight:700;\n' +
'                         color:#394140;line-height:1.3;">' + cfg.title + '</h1>\n' +
'\n' +
'              <p style="margin:0 0 32px;font-size:16px;color:#4a5568;\n' +
'                        line-height:1.75;">' + cfg.body + '</p>\n' +
'\n' +
'              <!-- CTA Button -->\n' +
'              <table cellpadding="0" cellspacing="0" border="0" role="presentation">\n' +
'                <tr>\n' +
'                  <td style="border-radius:10px;background-color:#5e817d;">\n' +
'                    <a href="' + cfg.btnUrl + '"\n' +
'                       style="display:inline-block;padding:14px 32px;font-size:16px;\n' +
'                              font-weight:700;color:#ffffff;text-decoration:none;\n' +
'                              border-radius:10px;font-family:Arial,Helvetica,sans-serif;">\n' +
'                      ' + cfg.btnText + '\n' +
'                    </a>\n' +
'                  </td>\n' +
'                </tr>\n' +
'              </table>\n' +
'\n' +
'            </td>\n' +
'          </tr>\n' +
'\n' +
'          <!-- ── FOOTER ── -->\n' +
'          <tr>\n' +
'            <td style="background-color:#f4f0ed;padding:22px 36px;\n' +
'                       text-align:center;border-top:1px solid #e5e2df;\n' +
'                       border-radius:0 0 16px 16px;">\n' +
'              <p style="margin:0 0 6px;font-size:12px;color:#9b9794;">\n' +
'                &copy; ' + new Date().getFullYear() + ' NewGen Finance &mdash; כל הזכויות שמורות\n' +
'              </p>\n' +
'              <a href="https://newgenfinance.co.il"\n' +
'                 style="font-size:12px;color:#5e817d;text-decoration:none;">\n' +
'                newgenfinance.co.il\n' +
'              </a>\n' +
'            </td>\n' +
'          </tr>\n' +
'\n' +
'        </table>\n' +
'      </td>\n' +
'    </tr>\n' +
'  </table>\n' +
'\n' +
'</body>\n' +
'</html>';

  return { subject: cfg.subject, html: html };
}

module.exports = { createEmailTemplate: createEmailTemplate };
