import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Heart, Sparkles, Feather, Check, Copy, Shield, Gift, ArrowDown } from 'lucide-react';
import { soundFX } from '../utils/soundEffects';

const HeartfeltLetter = ({ herName = 'Karthini' }) => {
  const [copied, setCopied] = useState(false);
  const [reactionHearts, setReactionHearts] = useState(0);

  const fullLetterText = `To My Love, Karthini ❤️

September 20…
உனக்கு Birthday மட்டும் இல்ல.
எனக்கு நீ எவ்வளவு முக்கியமானவள் என்று இன்னொரு முறை உணர வைக்கும் ஒரு நாள்.

இந்த birthday-க்கு உனக்கு ஒரு expensive gift-ஐ விட, என் மனசுல இருக்கிற சில உண்மையான வார்த்தைகளை கொடுக்கணும்னு நினைக்கிறேன்.

கடந்த வருடம் இதே நேரத்துல நான் செய்த ஒரு விஷயம் உன்னை எவ்வளவு hurt பண்ணியிருக்கும் என்று இப்போ நினைத்தாலும் எனக்கு வருத்தமா இருக்கு.
நான் செய்தது தப்பு. அதுக்கு எந்த excuse-உம் சொல்ல விரும்பல.
I was wrong. And I’m truly sorry.

அந்த ஒரு mistake-ஐ வைத்து என்னை நீ judge பண்ணினாலும், உனக்கு அந்த right இருக்கு. ஏன்னா அந்த pain-ஐ நான் கொடுத்தேன்.

ஆனா அந்த நாள்ல இருந்து நான் ஒரு விஷயத்தை புரிஞ்சுக்கிட்டேன்…

ஒருத்தரை உண்மையா love பண்ணுறது, “I love you”ன்னு சொல்லுறது மட்டும் இல்ல.
அவங்களோட trust-ஐ protect பண்ணுறதும், அவங்களோட feelings-ஐ respect பண்ணுறதும், அவங்களை மீண்டும் அதே pain-க்கு கொண்டு போகாததும் தான்.

நம்மக்குள்ள சண்டைகள் வந்திருக்கு.
Misunderstanding-கள் வந்திருக்கு.
சில நேரம் நம்ம ரெண்டு பேரும் ஒருத்தரை ஒருத்தர் புரிஞ்சுக்காம போயிருக்கோம்.

ஆனா அந்த எல்லா சண்டைகளுக்கும் மேல,
I still choose you.

இனிமேல் உன்னை hurt பண்ணுற மாதிரி எந்த situation-ஐயும் நான் create பண்ண விரும்பல.
வேற யாராவது வந்தாலும், எந்த attention கிடைத்தாலும், எந்த situation இருந்தாலும்—

என் boundaries-ம், என் loyalty-ம், என் respect-ம் உன்னோட தான் இருக்கும்.

நான் perfect-ஆ இருக்கேன் என்று சொல்ல மாட்டேன்.
என்னால mistakes வராதுன்னும் சொல்ல மாட்டேன்.

ஆனா ஒரு விஷயம் மட்டும் genuine-ஆ சொல்லுறேன்:

அதே தவறை மீண்டும் செய்யாத அளவுக்கு நான் என்னை மாற்றிக்கிட்டேன்.

நம்ம relationship-ல இனிமேல் ego-வுக்கு இடம் கொடுக்காம,
silent treatment-க்கு பதிலா பேசிக்கிட்டு,
சின்ன விஷயங்களை பெரிய சண்டையாக்காம,
ஒருத்தருடைய feelings-ஐ இன்னொருத்தர் புரிஞ்சுக்க முயற்சி பண்ணி வாழணும்.

நம்ம கடந்த காலத்தை delete பண்ண முடியாது.
ஆனா அதே past நம்ம future-ஐ decide பண்ண வேண்டிய அவசியமும் இல்லை.

What happened happened.
I learned from it.
And now I want to build something better with you.

நீ என் வாழ்க்கையில் வந்ததுக்கு நான் thankful.

உன்னோட smile, உன்னோட கோபம், உன்னோட childish moments, நம்ம சின்ன சின்ன fights, நம்ம conversations…
எல்லாமே somehow என் வாழ்க்கையோட ஒரு part ஆகிடுச்சு.

அதனால இந்த birthday-ல நான் உன்கிட்ட ஒரு promise கேட்கல.

நீ என்னை நம்பணும்னு நான் force பண்ண மாட்டேன்.
அந்த trust-ஐ நான் என் actions மூலமா மீண்டும் earn பண்ணிக்கிறேன்.

நம்ம story-ல ஒரு chapter bad-ஆ இருந்திருக்கலாம்.
ஆனா அதுக்காக முழு story-யும் முடிஞ்சிடணும்னு நான் நினைக்கல.

I want the next chapters to be better.
Calmer.
Stronger.
Happier.
And together.

ஒரு நாள் நம்ம இந்த காலத்தை திரும்பிப் பார்த்து,

“நம்ம ரெண்டு பேரும் அந்த phase-ஐ கடந்து வந்துட்டோம்”
ன்னு சொல்லணும்.

உன்னோட birthday-க்கு நான் wish பண்ணுறது உனக்கு happiness மட்டும் இல்ல…

நம்ம இருவருக்கும் peace.
Understanding.
Trust.
And a love that gets stronger with time.

கடந்த வருடம் நான் உனக்கு ஒரு reason to hurt கொடுத்தேன்.

இந்த வருடத்திலிருந்து,
நான் உனக்கு ஒரு reason to feel safe, loved and respected ஆக இருக்கணும்.

நீ என்னோட life-ல ஒரு temporary person இல்ல.

I want you in my future.
I want to grow with you.
I want to build my life with you.
And as long as we both choose each other, I want to keep choosing you.

இந்த birthday-ல ஒரு விஷயம் மட்டும் நினைச்சுக்கோ…

I am sorry for the person I was.
I am grateful for the person you are.
And I am serious about the person I want to become for us.

Happy Birthday, my love. ❤️

September 20 will always be special to me,
because the person I love was born on this day.

No more unnecessary fights.
No more hurting each other.
No more letting ego win over love.

Let’s leave the old pain where it belongs — in the past.
And start again… together. ❤️

Always yours,
Gopi ❤️`;

  const handleCopyLetter = () => {
    navigator.clipboard.writeText(fullLetterText);
    setCopied(true);
    soundFX.playPop();
    setTimeout(() => setCopied(false), 3000);
  };

  const handleHeartReaction = () => {
    soundFX.playChime();
    setReactionHearts(prev => prev + 1);

    confetti({
      particleCount: 50,
      spread: 75,
      origin: { y: 0.8 },
      colors: ['#00f5d4', '#06d6a0', '#00b4d8', '#ffd166', '#7209b7'],
      shapes: ['circle'],
    });
  };

  return (
    <section id="heartfelt-letter" style={{
      maxWidth: '940px',
      margin: '60px auto',
      padding: '0 16px',
      position: 'relative',
      zIndex: 2,
    }}>
      {/* Header Badge */}
      <div style={{ textAlign: 'center', marginBottom: '32px' }}>
        <span style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '8px',
          padding: '6px 20px',
          borderRadius: '9999px',
          background: 'rgba(0, 245, 212, 0.15)',
          border: '1px solid rgba(0, 245, 212, 0.4)',
          color: '#00f5d4',
          fontSize: '0.85rem',
          fontWeight: 600,
          letterSpacing: '1.5px',
          textTransform: 'uppercase',
          marginBottom: '12px',
          backdropFilter: 'blur(8px)',
        }}>
          <Feather size={15} /> Royal Peacock Love Letter <Feather size={15} />
        </span>
        <h2 style={{
          fontFamily: 'var(--font-serif)',
          fontSize: 'clamp(2.2rem, 5.5vw, 3.4rem)',
          background: 'linear-gradient(135deg, #ffffff 20%, #c8f4f9 55%, #00f5d4 90%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          marginBottom: '8px',
          lineHeight: 1.2,
          textShadow: '0 4px 20px rgba(0,0,0,0.5)',
        }}>
          A Heartfelt Letter To Karthini 🪶💌
        </h2>
        <p style={{
          color: '#c8f4f9',
          fontSize: '1.05rem',
          maxWidth: '650px',
          margin: '0 auto',
        }}>
          "Words written with deep truth, unwavering loyalty, and royal promises for our tomorrow."
        </p>
      </div>

      {/* Royal Glowing Peacock Velvet Manuscript Container */}
      <div className="royal-letter-manuscript" style={{
        background: 'linear-gradient(165deg, rgba(3, 30, 48, 0.94) 0%, rgba(2, 20, 32, 0.97) 50%, rgba(1, 14, 23, 0.99) 100%)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRadius: '24px',
        border: '1.5px solid rgba(0, 245, 212, 0.38)',
        boxShadow: '0 25px 70px rgba(0, 0, 0, 0.85), 0 0 50px rgba(0, 245, 212, 0.18), inset 0 0 60px rgba(0, 245, 212, 0.04)',
        padding: 'clamp(24px, 5vw, 54px) clamp(20px, 4.5vw, 48px)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Inner Gold Foil Dashed Frame */}
        <div style={{
          position: 'absolute',
          inset: '12px',
          border: '1px dashed rgba(255, 209, 102, 0.3)',
          borderRadius: '16px',
          pointerEvents: 'none',
        }} />

        {/* Ambient Top Glow Orbs */}
        <div style={{
          position: 'absolute',
          top: '-40px',
          right: '10%',
          width: '260px',
          height: '260px',
          background: 'radial-gradient(circle, rgba(0, 245, 212, 0.18) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />
        <div style={{
          position: 'absolute',
          bottom: '5%',
          left: '5%',
          width: '240px',
          height: '240px',
          background: 'radial-gradient(circle, rgba(255, 209, 102, 0.12) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
        }} />

        {/* Top Header Row */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          borderBottom: '1px solid rgba(0, 245, 212, 0.25)',
          paddingBottom: '20px',
          marginBottom: '28px',
          flexWrap: 'wrap',
          gap: '16px',
          position: 'relative',
          zIndex: 2,
        }}>
          <div>
            <div style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2.2rem, 5.5vw, 3rem)',
              background: 'linear-gradient(135deg, #ffffff 15%, #ffd166 65%, #00f5d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              fontWeight: 700,
              lineHeight: 1.1,
              textShadow: '0 2px 15px rgba(0, 245, 212, 0.3)',
            }}>
              To My Love, Karthini ❤️
            </div>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: '0.95rem',
              color: '#ffd166',
              letterSpacing: '1px',
              marginTop: '6px',
              fontWeight: 600,
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
            }}>
              <Sparkles size={14} color="#ffd166" /> September 20 — A Day That Forever Changed My Life
            </div>
          </div>

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            background: 'linear-gradient(135deg, #00b4d8, #06d6a0)',
            color: '#011627',
            padding: '6px 16px',
            borderRadius: '9999px',
            boxShadow: '0 4px 16px rgba(0, 245, 212, 0.4)',
            fontSize: '0.82rem',
            fontWeight: 800,
            letterSpacing: '1px',
            textTransform: 'uppercase',
          }}>
            <Sparkles size={14} /> Royal Vows 🪶
          </div>
        </div>

        {/* Letter Body with Tamil & English Typography */}
        <div className="tamil-text" style={{
          fontSize: 'clamp(1.05rem, 2.6vw, 1.25rem)',
          color: '#e2f8f5',
          lineHeight: '1.95',
          display: 'flex',
          flexDirection: 'column',
          gap: '22px',
          position: 'relative',
          zIndex: 2,
        }}>
          {/* Opening */}
          <p>
            <strong style={{ color: '#ffd166', fontSize: '1.25rem' }}>September 20…</strong><br />
            உனக்கு Birthday மட்டும் இல்ல.<br />
            எனக்கு நீ எவ்வளவு முக்கியமானவள் என்று இன்னொரு முறை உணர வைக்கும் ஒரு நாள்.
          </p>

          <p style={{ color: '#d0f4de' }}>
            இந்த birthday-க்கு உனக்கு ஒரு expensive gift-ஐ விட, என் மனசுல இருக்கிற சில உண்மையான வார்த்தைகளை கொடுக்கணும்னு நினைக்கிறேன்.
          </p>

          {/* Sincere Apology Box */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(0, 119, 182, 0.22) 0%, rgba(2, 62, 138, 0.18) 100%)',
            borderLeft: '4px solid #00f5d4',
            borderRight: '1px solid rgba(0, 245, 212, 0.2)',
            borderTop: '1px solid rgba(0, 245, 212, 0.2)',
            borderBottom: '1px solid rgba(0, 245, 212, 0.2)',
            padding: '18px 22px',
            borderRadius: '0 16px 16px 0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <p style={{ margin: 0, fontStyle: 'italic', color: '#c8f4f9' }}>
              கடந்த வருடம் இதே நேரத்துல நான் செய்த ஒரு விஷயம் உன்னை எவ்வளவு hurt பண்ணியிருக்கும் என்று இப்போ நினைத்தாலும் எனக்கு வருத்தமா இருக்கு.<br />
              நான் செய்தது தப்பு. அதுக்கு எந்த excuse-உம் சொல்ல விரும்பல.<br />
              <strong style={{
                color: '#ffd166',
                fontSize: '1.25rem',
                fontFamily: 'var(--font-serif)',
                display: 'block',
                marginTop: '8px',
                letterSpacing: '0.5px',
                textShadow: '0 0 12px rgba(255, 209, 102, 0.4)',
              }}>
                "I was wrong. And I’m truly sorry."
              </strong>
            </p>
          </div>

          <p>
            அந்த ஒரு mistake-ஐ வைத்து என்னை நீ judge பண்ணினாலும், உனக்கு அந்த right இருக்கு. ஏன்னா அந்த pain-ஐ நான் கொடுத்தேன்.
          </p>

          <p style={{ color: '#00f5d4', fontWeight: 600 }}>
            ஆனா அந்த நாள்ல இருந்து நான் ஒரு விஷயத்தை புரிஞ்சுக்கிட்டேன்…
          </p>

          {/* Core realization */}
          <div style={{
            background: 'rgba(0, 245, 212, 0.08)',
            border: '1px solid rgba(0, 245, 212, 0.35)',
            borderRadius: '16px',
            padding: '18px 22px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.25)',
          }}>
            <p style={{ margin: 0, color: '#e0fbf2', fontWeight: 500 }}>
              ஒருத்தரை உண்மையா love பண்ணுறது, <em style={{ color: '#ffd166', fontWeight: 700 }}>“I love you”</em>ன்னு சொல்லுறது மட்டும் இல்ல.<br />
              அவங்களோட trust-ஐ protect பண்ணுறதும், அவங்களோட feelings-ஐ respect பண்ணுறதும், அவங்களை மீண்டும் அதே pain-க்கு கொண்டு போகாததும் தான்.
            </p>
          </div>

          <p>
            நம்மக்குள்ள சண்டைகள் வந்திருக்கு.<br />
            Misunderstanding-கள் வந்திருக்கு.<br />
            சில நேரம் நம்ம ரெண்டு பேரும் ஒருத்தரை ஒருத்தர் புரிஞ்சுக்காம போயிருக்கோம்.
          </p>

          {/* "I still choose you" Callout */}
          <div style={{
            textAlign: 'center',
            padding: '24px 20px',
            background: 'linear-gradient(135deg, rgba(0, 245, 212, 0.16) 0%, rgba(255, 209, 102, 0.14) 100%)',
            borderRadius: '20px',
            border: '1.5px solid rgba(0, 245, 212, 0.5)',
            margin: '10px 0',
            boxShadow: '0 10px 32px rgba(0, 245, 212, 0.2), inset 0 0 20px rgba(255, 209, 102, 0.1)',
          }}>
            <span style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.3rem, 3.5vw, 1.85rem)',
              color: '#ffffff',
              fontWeight: 700,
              display: 'block',
            }}>
              ஆனா அந்த எல்லா சண்டைகளுக்கும் மேல,<br />
              <span style={{
                fontFamily: 'var(--font-script)',
                fontSize: 'clamp(2.4rem, 6vw, 3.2rem)',
                background: 'linear-gradient(135deg, #ffffff 10%, #ffd166 50%, #00f5d4 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                display: 'block',
                marginTop: '4px',
                textShadow: '0 0 25px rgba(0, 245, 212, 0.5)',
              }}>
                I still choose you. 🪶✨
              </span>
            </span>
          </div>

          <p>
            இனிமேல் உன்னை hurt பண்ணுற மாதிரி எந்த situation-ஐயும் நான் create பண்ண விரும்பல.<br />
            வேற யாராவது வந்தாலும், எந்த attention கிடைத்தாலும், எந்த situation இருந்தாலும்—
          </p>

          {/* Boundaries & Loyalty */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(255, 209, 102, 0.12) 0%, rgba(229, 169, 60, 0.08) 100%)',
            borderLeft: '4px solid #ffd166',
            borderRight: '1px solid rgba(255, 209, 102, 0.25)',
            borderTop: '1px solid rgba(255, 209, 102, 0.25)',
            borderBottom: '1px solid rgba(255, 209, 102, 0.25)',
            padding: '18px 22px',
            borderRadius: '0 16px 16px 0',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px', color: '#ffd166', fontWeight: 700, fontSize: '0.9rem', textTransform: 'uppercase' }}>
              <Shield size={16} /> My Unwavering Vow:
            </div>
            <strong style={{ fontSize: '1.25rem', color: '#ffffff', display: 'block', textShadow: '0 0 10px rgba(255,209,102,0.3)' }}>
              என் boundaries-ம், என் loyalty-ம், என் respect-ம் உன்னோட தான் இருக்கும்.
            </strong>
          </div>

          <p>
            நான் perfect-ஆ இருக்கேன் என்று சொல்ல மாட்டேன்.<br />
            என்னால mistakes வராதுன்னும் சொல்ல மாட்டேன்.
          </p>

          <p>
            ஆனா ஒரு விஷயம் மட்டும் genuine-ஆ சொல்லுறேன்:<br />
            <strong style={{ color: '#00f5d4', fontSize: '1.15rem' }}>அதே தவறை மீண்டும் செய்யாத அளவுக்கு நான் என்னை மாற்றிக்கிட்டேன்.</strong>
          </p>

          <p>
            நம்ம relationship-ல இனிமேல் ego-வுக்கு இடம் கொடுக்காம,<br />
            silent treatment-க்கு பதிலா பேசிக்கிட்டு,<br />
            சின்ன விஷயங்களை பெரிய சண்டையாக்காம,<br />
            ஒருத்தருடைய feelings-ஐ இன்னொருத்தர் புரிஞ்சுக்க முயற்சி பண்ணி வாழணும்.
          </p>

          <p>
            நம்ம கடந்த காலத்தை delete பண்ண முடியாது.<br />
            ஆனா அதே past நம்ம future-ஐ decide பண்ண வேண்டிய அவசியமும் இல்லை.
          </p>

          {/* Building Something Better */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.14) 0%, rgba(0, 180, 216, 0.1) 100%)',
            borderRadius: '16px',
            padding: '20px 22px',
            border: '1px solid rgba(6, 214, 160, 0.4)',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <p style={{ margin: 0, color: '#c8f4f9', fontWeight: 600 }}>
              What happened happened.<br />
              I learned from it.<br />
              <span style={{ fontSize: '1.3rem', color: '#06d6a0', display: 'block', marginTop: '6px', fontWeight: 700, textShadow: '0 0 12px rgba(6, 214, 160, 0.4)' }}>
                And now I want to build something better with you. 🪶💎
              </span>
            </p>
          </div>

          <p>
            நீ என் வாழ்க்கையில் வந்ததுக்கு நான் thankful.<br />
            உன்னோட smile, உன்னோட கோபம், உன்னோட childish moments, நம்ம சின்ன சின்ன fights, நம்ம conversations…<br />
            எல்லாமே somehow என் வாழ்க்கையோட ஒரு part ஆகிடுச்சு.
          </p>

          <p>
            அதனால இந்த birthday-ல நான் உன்கிட்ட ஒரு promise கேட்கல.<br />
            நீ என்னை நம்பணும்னு நான் force பண்ண மாட்டேன்.<br />
            <strong style={{ color: '#ffd166' }}>அந்த trust-ஐ நான் என் actions மூலமா மீண்டும் earn பண்ணிக்கிறேன்.</strong>
          </p>

          <p>
            நம்ம story-ல ஒரு chapter bad-ஆ இருந்திருக்கலாம்.<br />
            ஆனா அதுக்காக முழு story-யும் முடிஞ்சிடணும்னு நான் நினைக்கல.
          </p>

          {/* Next Chapters */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))',
            gap: '10px',
            textAlign: 'center',
            margin: '8px 0',
          }}>
            {['Better 🌸', 'Calmer 🕊️', 'Stronger 💎', 'Happier ✨', 'Together 💑'].map((trait, idx) => (
              <div key={idx} style={{
                background: 'rgba(255, 255, 255, 0.08)',
                border: '1px solid rgba(0, 245, 212, 0.3)',
                borderRadius: '12px',
                padding: '12px 8px',
                fontWeight: 700,
                color: '#ffd166',
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(0,0,0,0.2)',
                backdropFilter: 'blur(8px)',
              }}>
                {trait}
              </div>
            ))}
          </div>

          <p>
            ஒரு நாள் நம்ம இந்த காலத்தை திரும்பிப் பார்த்து,<br />
            <em style={{ color: '#00f5d4' }}>“நம்ம ரெண்டு பேரும் அந்த phase-ஐ கடந்து வந்துட்டோம்”</em><br />
            ன்னு சொல்லணும்.
          </p>

          <p>
            உன்னோட birthday-க்கு நான் wish பண்ணுறது உனக்கு happiness மட்டும் இல்ல…<br />
            <strong style={{ color: '#ffd166' }}>நம்ம இருவருக்கும் peace. Understanding. Trust. And a love that gets stronger with time.</strong>
          </p>

          {/* Reason to feel safe */}
          <div style={{
            background: 'linear-gradient(135deg, rgba(6, 214, 160, 0.16) 0%, rgba(0, 119, 182, 0.12) 100%)',
            borderLeft: '4px solid #06d6a0',
            borderRight: '1px solid rgba(6, 214, 160, 0.25)',
            borderTop: '1px solid rgba(6, 214, 160, 0.25)',
            borderBottom: '1px solid rgba(6, 214, 160, 0.25)',
            borderRadius: '0 16px 16px 0',
            padding: '18px 22px',
            boxShadow: '0 8px 24px rgba(0,0,0,0.3)',
          }}>
            <p style={{ margin: 0, fontWeight: 600, color: '#c8f4f9' }}>
              கடந்த வருடம் நான் உனக்கு ஒரு reason to hurt கொடுத்தேன்.<br />
              <span style={{ fontSize: '1.25rem', color: '#06d6a0', display: 'block', marginTop: '8px', fontWeight: 700, textShadow: '0 0 12px rgba(6, 214, 160, 0.4)' }}>
                இந்த வருடத்திலிருந்து, நான் உனக்கு ஒரு reason to feel safe, loved and respected ஆக இருக்கணும். 🛡️💙
              </span>
            </p>
          </div>

          <p>
            நீ என்னோட life-ல ஒரு temporary person இல்ல.
          </p>

          <p style={{
            fontFamily: 'var(--font-serif)',
            fontSize: '1.25rem',
            color: '#e0fbf2',
            lineHeight: 1.7,
            background: 'rgba(0, 245, 212, 0.07)',
            border: '1px solid rgba(0, 245, 212, 0.25)',
            padding: '18px 22px',
            borderRadius: '16px',
          }}>
            I want you in my future.<br />
            I want to grow with you.<br />
            I want to build my life with you.<br />
            <strong style={{ color: '#ffd166', display: 'block', marginTop: '4px' }}>And as long as we both choose each other, I want to keep choosing you.</strong>
          </p>

          {/* 3 Core Sentences */}
          <div style={{
            background: 'linear-gradient(145deg, #032033 0%, #011420 100%)',
            color: '#fff',
            borderRadius: '18px',
            padding: '28px 22px',
            textAlign: 'center',
            boxShadow: '0 12px 35px rgba(0,0,0,0.5), 0 0 30px rgba(0, 245, 212, 0.2)',
            border: '1.5px solid rgba(255, 209, 102, 0.55)',
          }}>
            <span style={{ color: '#ffd166', fontSize: '0.9rem', letterSpacing: '1.5px', fontWeight: 700, textTransform: 'uppercase', display: 'block', marginBottom: '12px' }}>
              ✨ இந்த birthday-ல ஒரு விஷயம் மட்டும் நினைச்சுக்கோ… ✨
            </span>
            <div style={{
              fontFamily: 'var(--font-serif)',
              fontSize: 'clamp(1.2rem, 3vw, 1.5rem)',
              lineHeight: 1.7,
              color: '#ffffff',
              fontStyle: 'italic',
            }}>
              "I am sorry for the person I was.<br />
              I am grateful for the person you are.<br />
              And I am serious about the person I want to become for us."
            </div>
          </div>

          {/* Final Birthday Greeting & Vow */}
          <div style={{ textAlign: 'center', marginTop: '20px' }}>
            <h3 style={{
              fontFamily: 'var(--font-script)',
              fontSize: 'clamp(2.6rem, 6.5vw, 3.6rem)',
              background: 'linear-gradient(135deg, #ffffff 20%, #c8f4f9 60%, #00f5d4 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              marginBottom: '6px',
            }}>
              Happy Birthday, my love. 🪶❤️
            </h3>
            <p style={{ color: '#ffd166', fontStyle: 'italic', margin: '4px 0 16px', fontSize: '1.05rem' }}>
              "September 20 will always be special to me, because the person I love was born on this day."
            </p>

            <div style={{
              background: 'rgba(0, 245, 212, 0.08)',
              border: '1px solid rgba(0, 245, 212, 0.3)',
              padding: '16px 20px',
              borderRadius: '14px',
              fontSize: '1.05rem',
              color: '#d0f4de',
              fontWeight: 600,
              maxWidth: '520px',
              margin: '0 auto',
            }}>
              No more unnecessary fights. 🕊️<br />
              No more hurting each other. 🤍<br />
              No more letting ego win over love. ✨
            </div>

            <p style={{
              marginTop: '22px',
              fontSize: '1.3rem',
              fontWeight: 700,
              color: '#00f5d4',
              textShadow: '0 0 15px rgba(0, 245, 212, 0.4)',
            }}>
              Let’s leave the old pain where it belongs — in the past.<br />
              And start again… together. 🪶❤️
            </p>
          </div>

          {/* Signature */}
          <div style={{
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            marginTop: '28px',
            paddingTop: '20px',
            borderTop: '1px solid rgba(0, 245, 212, 0.25)',
          }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{
                fontFamily: 'var(--font-hand)',
                fontSize: '1.5rem',
                color: '#ffd166',
              }}>
                Always yours,
              </div>
              <div style={{
                fontFamily: 'var(--font-script)',
                fontSize: '3.4rem',
                background: 'linear-gradient(135deg, #ffffff, #ffd166, #00f5d4)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                fontWeight: 700,
                lineHeight: 1,
                marginTop: '4px',
                filter: 'drop-shadow(0 0 10px rgba(0, 245, 212, 0.4))',
              }}>
                Gopi ❤️
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Interactive Keepsake Toolbar */}
        <div style={{
          marginTop: '36px',
          paddingTop: '22px',
          borderTop: '1px solid rgba(0, 245, 212, 0.25)',
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '12px',
          position: 'relative',
          zIndex: 2,
        }}>
          <button
            onClick={handleHeartReaction}
            className="btn-romantic"
            style={{
              padding: '12px 24px',
              fontSize: '0.95rem',
            }}
          >
            <Heart size={18} fill="#011627" color="#011627" />
            Send Royal Love {reactionHearts > 0 ? `(${reactionHearts})` : ''}
          </button>

          <button
            onClick={handleCopyLetter}
            className="btn-outline-romantic"
            style={{
              padding: '11px 22px',
              fontSize: '0.92rem',
            }}
          >
            {copied ? (
              <>
                <Check size={16} color="#00f5d4" /> Letter Saved to Clipboard!
              </>
            ) : (
              <>
                <Copy size={16} /> Save Letter As Keepsake
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
};

export default HeartfeltLetter;
