import type { Slide } from "./types";

/**
 * Curated Baby Mo-style content seeds.
 * Used by the offline generator and as creative scaffolding for the AI prompt.
 * Each seed maps to a contentTypeId.
 */

export interface SampleSeed {
  title: string;
  hook: string;
  slides: Slide[];
  caption: string;
  cta: string;
  hashtags: string[];
}

export const SEEDS: Record<string, SampleSeed[]> = {
  "daily-dua": [
    {
      title: "A tiny dua before sleep",
      hook: "Three soft words before the lights go out.",
      slides: [
        { heading: "Before sleep", body: "Hold their tiny hand. Whisper this.", footer: "Baby Mo · Daily Dua" },
        { heading: "Bismika Allahumma", body: "In Your name, O Allah, I die and I live.", arabic: "بِاسْمِكَ اللَّهُمَّ أَمُوتُ وَأَحْيَا", footer: "Baby Mo · Daily Dua" },
        { heading: "Tonight", body: "Let them fall asleep knowing they are remembered by the One who never sleeps.", footer: "Baby Mo · Daily Dua" },
      ],
      caption: "A tiny bedtime dua to whisper into your little one's ear tonight 🤍",
      cta: "Save this for tonight's bedtime routine.",
      hashtags: ["#babymo", "#dailydua", "#muslimkids", "#bedtimedua", "#gentleparenting"],
    },
    {
      title: "Morning words for a tender heart",
      hook: "Wake them up with a dua, not a rush.",
      slides: [
        { heading: "Good morning, little one", body: "Before the day begins, a small remembrance.", footer: "Baby Mo · Daily Dua" },
        { heading: "Alhamdulillah", body: "All praise is for Allah who gave us life after death.", arabic: "الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا", footer: "Baby Mo · Daily Dua" },
        { heading: "Try this", body: "Whisper it as you open the curtains. Let mornings feel safe.", footer: "Baby Mo · Daily Dua" },
      ],
      caption: "Start the morning with softness, not noise.",
      cta: "Share with a mama who needs softer mornings.",
      hashtags: ["#babymo", "#morningdua", "#muslimmama", "#cozyhome", "#islamicparenting"],
    },
  ],
  "quran-ayah": [
    {
      title: "He is with you, wherever you are",
      hook: "A reminder for the tired heart.",
      slides: [
        { heading: "Quran 57:4", body: "And He is with you wherever you are.", arabic: "وَهُوَ مَعَكُمْ أَيْنَ مَا كُنتُمْ", footer: "Baby Mo · Quran Ayah" },
        { heading: "On the kitchen floor.", body: "On the school run. In the silent 3am.", footer: "Baby Mo · Quran Ayah" },
        { heading: "He sees you", body: "You are not parenting alone. You never were.", footer: "Baby Mo · Quran Ayah" },
      ],
      caption: "For the mama who feels unseen today 🤍",
      cta: "Save & send to a friend.",
      hashtags: ["#babymo", "#quran", "#muslimmama", "#dailyreminder", "#hewithyou"],
    },
  ],
  "hadith-motivation": [
    {
      title: "Smile, it is sadaqah",
      hook: "The Prophet ﷺ taught us softness is worship.",
      slides: [
        { heading: "Hadith", body: "Your smile to your brother is charity.", footer: "— Tirmidhi, Baby Mo · Hadith" },
        { heading: "What this means", body: "Even when tired, a soft face is a gift.", footer: "Baby Mo · Hadith" },
        { heading: "Try today", body: "Smile at your child first thing in the morning. Watch their whole body soften.", footer: "Baby Mo · Hadith" },
      ],
      caption: "A reminder that even the smallest softness counts.",
      cta: "Save for a hard morning.",
      hashtags: ["#babymo", "#hadith", "#muslimparenting", "#softnessisworship"],
    },
  ],
  "friday-reminder": [
    {
      title: "Jumuah blessings",
      hook: "Light a candle. Send salawat. Slow down.",
      slides: [
        { heading: "It's Friday", body: "The most beloved day of the week.", footer: "Baby Mo · Jumuah" },
        { heading: "Tiny ritual", body: "Recite Surah Al-Kahf. Send salawat. Wear something soft.", footer: "Baby Mo · Jumuah" },
      ],
      caption: "Jumuah Mubarak from our cozy little home to yours 🕊️",
      cta: "Tag your Jumuah buddy.",
      hashtags: ["#babymo", "#jumuah", "#fridayreminder", "#salawat"],
    },
  ],
  "ramadan-reminder": [
    {
      title: "30 small Ramadan moments",
      hook: "Ramadan is in the texture, not just the timer.",
      slides: [
        { heading: "Tiny Ramadan", body: "It's not about doing more. It's about doing softly.", footer: "Baby Mo · Ramadan" },
        { heading: "Try tonight", body: "Recite one ayah with your child before iftar. Just one.", footer: "Baby Mo · Ramadan" },
        { heading: "Remember", body: "Your child will remember the smell of the kitchen, not the productivity.", footer: "Baby Mo · Ramadan" },
      ],
      caption: "Ramadan in small, sacred textures 🌙",
      cta: "Save for Ramadan prep.",
      hashtags: ["#babymo", "#ramadan", "#cozyramadan", "#muslimkids"],
    },
  ],
  "dhikr-reminder": [
    {
      title: "Breathe. Say it once.",
      hook: "One breath, one dhikr.",
      slides: [
        { heading: "SubhanAllah", body: "Inhale. Exhale. Let your shoulders drop.", arabic: "سُبْحَانَ اللَّهِ", footer: "Baby Mo · Dhikr" },
      ],
      caption: "A gentle reset for a noisy day.",
      cta: "Pin to your home screen.",
      hashtags: ["#babymo", "#dhikr", "#muslimmama", "#calmislam"],
    },
  ],
  "tiny-heart-talks": [
    {
      title: "When she said she was scared of the dark",
      hook: "Sometimes the bravest dua is whispered under a blanket.",
      slides: [
        { heading: "Mama, the dark is too big.", body: "She tugged my sleeve. Her whole body was a question.", footer: "Baby Mo · Tiny Heart Talks" },
        { heading: "I didn't fix it.", body: "I just sat on the floor next to her bed.", footer: "Baby Mo · Tiny Heart Talks" },
        { heading: "Allah is closer than the dark.", body: "I told her: He hears the smallest whisper. Even softer than this.", footer: "Baby Mo · Tiny Heart Talks" },
        { heading: "Then I'll whisper.", body: "She held my hand and said it. And the dark felt smaller.", footer: "Baby Mo · Tiny Heart Talks" },
        { heading: "For the next bedtime fear.", body: "Save this. Sit on the floor. Whisper together.", footer: "Baby Mo · Tiny Heart Talks" },
      ],
      caption: "Some dua's are taught with a hand in the dark 🤍",
      cta: "Save for a brave bedtime.",
      hashtags: ["#babymo", "#tinyheartalks", "#muslimkids", "#bedtime"],
    },
  ],
  "dear-little-muslim": [
    {
      title: "Dear little Muslim,",
      hook: "A letter for the child who is still becoming.",
      slides: [
        { heading: "Dear little Muslim,", body: "You don't need to be perfect to be beloved.", footer: "Baby Mo · Dear Little Muslim" },
        { heading: "On hard days,", body: "Allah is closer than your shadow. Closer than your breath.", footer: "Baby Mo · Dear Little Muslim" },
        { heading: "You will grow,", body: "But the softness in you — keep it. It is a sunnah.", footer: "Baby Mo · Dear Little Muslim" },
        { heading: "Always,", body: "Mama", footer: "Baby Mo · Dear Little Muslim" },
      ],
      caption: "Letters we hope every Muslim child grows up reading.",
      cta: "Tag a little one you love.",
      hashtags: ["#babymo", "#dearlittlemuslim", "#muslimchildhood"],
    },
  ],
  "before-sleep-series": [
    {
      title: "The before-sleep ritual",
      hook: "Three minutes of softness before lights out.",
      slides: [
        { heading: "Step 1", body: "Dim the lights. Lower your voice. Let the day end.", footer: "Baby Mo · Before Sleep" },
        { heading: "Step 2", body: "Hold their hand. Recite Surah Al-Falaq + An-Nas together.", footer: "Baby Mo · Before Sleep" },
        { heading: "Step 3", body: "Blow gently on their forehead. Say: 'Allah is watching over you.'", footer: "Baby Mo · Before Sleep" },
        { heading: "That's it.", body: "Bedtime doesn't need to be longer. It needs to be softer.", footer: "Baby Mo · Before Sleep" },
      ],
      caption: "A tiny bedtime ritual we love 🌙",
      cta: "Save for tonight.",
      hashtags: ["#babymo", "#bedtime", "#muslimkids", "#bedtimeroutine"],
    },
  ],
  "tiny-tafakkur": [
    {
      title: "A leaf, a sign",
      hook: "Stop. Look. Allah designed this.",
      slides: [
        { heading: "Tiny tafakkur", body: "The veins on a leaf. The way light filters through it. Every detail was decided.", footer: "Baby Mo · Tafakkur" },
      ],
      caption: "Look up today. Allah is everywhere in the small things.",
      cta: "Share with someone tired of looking at screens.",
      hashtags: ["#babymo", "#tafakkur", "#allahssigns"],
    },
  ],
  "muslim-childhood-nostalgia": [
    {
      title: "The smell of opah's kitchen",
      hook: "A whole religion learned through warmth.",
      slides: [
        { heading: "Do you remember", body: "The smell of opah's kitchen on Hari Raya morning?", footer: "Baby Mo · Nostalgia" },
        { heading: "Bismillah", body: "Said before every bite, even the biscuits she snuck you.", footer: "Baby Mo · Nostalgia" },
        { heading: "Adhan from the radio", body: "And the whole family slowing down at once.", footer: "Baby Mo · Nostalgia" },
        { heading: "That was Islam", body: "Not loud. Just woven into every soft moment.", footer: "Baby Mo · Nostalgia" },
        { heading: "Pass it on", body: "We build the same memory for our little ones today.", footer: "Baby Mo · Nostalgia" },
      ],
      caption: "Childhood Islam, in the texture of home 🏡",
      cta: "Tag someone who'd cry at this.",
      hashtags: ["#babymo", "#muslimchildhood", "#nostalgia", "#cozyislam"],
    },
  ],
  "gentle-muslim-parenting": [
    {
      title: "Yelling isn't tarbiyah",
      hook: "Discipline doesn't have to be loud to be deep.",
      slides: [
        { heading: "The truth", body: "Your child can fear you, or trust you. Rarely both.", footer: "Baby Mo · Gentle Parenting" },
        { heading: "Sunnah way", body: "The Prophet ﷺ never raised his voice in anger toward a child.", footer: "Baby Mo · Gentle Parenting" },
        { heading: "Try instead", body: "Kneel to their level. Make eye contact. Lower your voice. Watch what happens.", footer: "Baby Mo · Gentle Parenting" },
        { heading: "Reminder", body: "Tarbiyah is a long, soft project. Not a single loud moment.", footer: "Baby Mo · Gentle Parenting" },
        { heading: "Save", body: "For the next hard parenting hour.", footer: "Baby Mo · Gentle Parenting" },
      ],
      caption: "Soft discipline is still discipline 🤍",
      cta: "Save for the next hard hour.",
      hashtags: ["#babymo", "#gentleparenting", "#muslimparenting", "#tarbiyah"],
    },
  ],
  "mama-reflection": [
    {
      title: "I lost my patience today",
      hook: "And I made tawbah while folding the laundry.",
      slides: [
        { heading: "Mama reflection", body: "I lost my patience today. I said sorry to a tiny face. Then I made tawbah while folding the laundry.", footer: "Baby Mo · Mama Reflection" },
      ],
      caption: "Motherhood is also a long istighfar. And that's okay.",
      cta: "Share with a mama who needs it.",
      hashtags: ["#babymo", "#muslimmama", "#mamareflection"],
    },
  ],
  "ayah-series": [
    {
      title: "Ayah, the quiet one",
      hook: "His love sounds like footsteps coming home.",
      slides: [
        { heading: "Ayah Series", body: "Ayah doesn't say 'I love you' often. He says it in shoes lined up by the door.", footer: "Baby Mo · Ayah Series" },
        { heading: "He says it", body: "In the way he carries you to the car after you fell asleep watching cartoons.", footer: "Baby Mo · Ayah Series" },
        { heading: "He says it", body: "In waking up for Fajr and asking Allah for your jannah.", footer: "Baby Mo · Ayah Series" },
        { heading: "Tell him today", body: "Thank him out loud. Quiet love deserves loud gratitude.", footer: "Baby Mo · Ayah Series" },
      ],
      caption: "For every quiet Ayah who loves loudly through actions 🤍",
      cta: "Tag your Ayah.",
      hashtags: ["#babymo", "#ayahseries", "#muslimdad"],
    },
  ],
  "emotional-parenting-reminder": [
    {
      title: "Your patience is being witnessed",
      hook: "Even when no one else sees.",
      slides: [
        { heading: "Reminder", body: "Every soft 'come here, sayang' instead of a shout — Allah counts it.", footer: "Baby Mo · Reminder" },
      ],
      caption: "Tonight's tiny mama reminder 🤍",
      cta: "Save to your home screen.",
      hashtags: ["#babymo", "#muslimmama", "#parentingreminder"],
    },
  ],
  "did-you-know": [
    {
      title: "Did you know?",
      hook: "The smallest sunnah, the biggest blessing.",
      slides: [
        { heading: "Did you know?", body: "Saying Bismillah before eating turns a snack into ibadah.", footer: "Baby Mo · Did You Know" },
        { heading: "Why", body: "It is the Prophet ﷺ's habit. And habit becomes character.", footer: "Baby Mo · Did You Know" },
        { heading: "Try with your child", body: "Say it together before every bite this week. Watch it stick.", footer: "Baby Mo · Did You Know" },
      ],
      caption: "Tiny Sunnah, lifelong habit 🤍",
      cta: "Save for dinner tonight.",
      hashtags: ["#babymo", "#didyouknow", "#sunnah", "#muslimkids"],
    },
  ],
  "allahs-creation": [
    {
      title: "Look at the moon",
      hook: "Allah made a nightlight for the whole world.",
      slides: [
        { heading: "Allah's creation", body: "The moon doesn't shine on its own. It reflects the sun's light.", footer: "Baby Mo · Creation" },
        { heading: "Just like us", body: "We don't shine on our own either. We reflect Allah's mercy.", footer: "Baby Mo · Creation" },
        { heading: "Show your child", body: "Step outside tonight. Point up. Say: 'Allah made this for us.'", footer: "Baby Mo · Creation" },
      ],
      caption: "Teach wonder before you teach rules 🌙",
      cta: "Save for tonight's bedtime walk.",
      hashtags: ["#babymo", "#allahscreation", "#muslimkids", "#tafakkur"],
    },
  ],
  "arabic-word-of-the-day": [
    {
      title: "Word of the day: Rahmah",
      hook: "It means more than 'mercy'.",
      slides: [
        { heading: "Rahmah", body: "Rahmah (رحمة) — a soft, womb-deep mercy. The same root as 'womb' (rahim).", arabic: "رَحْمَة", footer: "Baby Mo · Arabic" },
      ],
      caption: "Allah's mercy is womb-deep. Carry your child like that today 🤍",
      cta: "Save & teach your little one.",
      hashtags: ["#babymo", "#arabicword", "#rahmah", "#muslimkids"],
    },
  ],
  "islamic-fun-facts": [
    {
      title: "Cats had a tiny prophet fan club",
      hook: "Yes, really.",
      slides: [
        { heading: "Fun fact", body: "Prophet Muhammad ﷺ loved cats so much, one once slept on his cloak — and he cut it rather than wake her.", footer: "Baby Mo · Fun Facts" },
        { heading: "Why it matters", body: "Even the smallest creatures deserve gentleness. That's the Sunnah.", footer: "Baby Mo · Fun Facts" },
      ],
      caption: "Tiny hearts, tiny cats, big Sunnah 🐈",
      cta: "Tag a cat-loving kid.",
      hashtags: ["#babymo", "#islamicfunfacts", "#muslimkids", "#sunnah"],
    },
  ],
  "tiny-sahabah-stories": [
    {
      title: "Tiny Anas, big lesson",
      hook: "He served the Prophet ﷺ for 10 years. He was never scolded once.",
      slides: [
        { heading: "Meet Anas", body: "He was 10 when his mama brought him to the Prophet ﷺ.", footer: "Baby Mo · Sahabah" },
        { heading: "For 10 years", body: "Anas served him. The Prophet ﷺ never once said 'why did you do that?' or 'why didn't you do this?'", footer: "Baby Mo · Sahabah" },
        { heading: "The lesson", body: "Gentleness is leadership. Patience is tarbiyah.", footer: "Baby Mo · Sahabah" },
        { heading: "For us today", body: "Speak to your child the way the Prophet ﷺ spoke to Anas.", footer: "Baby Mo · Sahabah" },
      ],
      caption: "Stories that shape little hearts 🤍",
      cta: "Save & read at bedtime.",
      hashtags: ["#babymo", "#sahabahstories", "#muslimkids", "#tarbiyah"],
    },
  ],
  "guess-the-sunnah": [
    {
      title: "Guess the Sunnah",
      hook: "Three little habits. One is sunnah. Can you guess?",
      slides: [
        { heading: "Round 1", body: "A. Eat with your right hand. B. Brush teeth before fajr. C. Smile at your sibling.", footer: "Baby Mo · Guess" },
        { heading: "Trick answer", body: "All three are sunnah 🎉", footer: "Baby Mo · Guess" },
        { heading: "Save", body: "Try one this week with your little one.", footer: "Baby Mo · Guess" },
      ],
      caption: "Play this with your kids over dinner 🤍",
      cta: "Comment your favourite sunnah.",
      hashtags: ["#babymo", "#guessthesunnah", "#muslimkids"],
    },
  ],
  "finish-the-dua": [
    {
      title: "Finish the dua",
      hook: "Test your memory, with love.",
      slides: [
        { heading: "Fill in the blank", body: "Allahumma inni as'aluka __________. Comment the rest!", footer: "Baby Mo · Finish The Dua" },
      ],
      caption: "Comment the rest of the dua 👇",
      cta: "Comment your answer.",
      hashtags: ["#babymo", "#finishthedua", "#muslimkids"],
    },
  ],
  "spot-the-adab": [
    {
      title: "Spot the adab",
      hook: "Can your child find it?",
      slides: [
        { heading: "The scene", body: "Aisyah enters her grandma's house. She takes off her shoes, says salam, and helps carry the groceries.", footer: "Baby Mo · Spot The Adab" },
        { heading: "Spot it", body: "How many acts of adab can you count? (Hint: 3)", footer: "Baby Mo · Spot The Adab" },
        { heading: "Answer", body: "Removing shoes · saying salam · helping. Adab is everywhere.", footer: "Baby Mo · Spot The Adab" },
      ],
      caption: "Adab hunting is the best game for car rides 🚗",
      cta: "Save for your next car ride.",
      hashtags: ["#babymo", "#spottheadab", "#muslimkids"],
    },
  ],
  "tiny-sunnah-missions": [
    {
      title: "Today's Sunnah mission",
      hook: "Smile at three people today.",
      slides: [
        { heading: "Mission", body: "Smile at three people today. Big toothy ones. It's sadaqah.", footer: "Baby Mo · Sunnah Missions" },
      ],
      caption: "Tag your little Sunnah agent on this mission 🕊️",
      cta: "Tag your child.",
      hashtags: ["#babymo", "#sunnahmissions", "#muslimkids"],
    },
  ],
  "this-or-that-muslim-kid": [
    {
      title: "This or That: Muslim Kid Edition",
      hook: "Which one is your child?",
      slides: [
        { heading: "Pick one", body: "Dates 🌴 or kurma cake 🍰? · Surah Al-Fatiha or Al-Ikhlas? · Adhan from phone or the speaker?", footer: "Baby Mo · This or That" },
      ],
      caption: "Comment your child's combo 👇",
      cta: "Comment your answer.",
      hashtags: ["#babymo", "#thisorthat", "#muslimkids"],
    },
  ],
  "mini-islamic-story": [
    {
      title: "The little ant's dua",
      hook: "Even the smallest creatures speak to Allah.",
      slides: [
        { heading: "Once upon a time", body: "A tiny ant carried a leaf bigger than herself.", footer: "Baby Mo · Stories" },
        { heading: "She paused", body: "Looked up at the sky, and whispered: 'Ya Rahman, give me strength.'", footer: "Baby Mo · Stories" },
        { heading: "And Allah", body: "The One who hears every whisper — answered.", footer: "Baby Mo · Stories" },
        { heading: "The end", body: "If a tiny ant's dua is heard, so is yours, little one.", footer: "Baby Mo · Stories" },
      ],
      caption: "A bedtime story to remind little hearts that they're heard 🐜",
      cta: "Save for storytime.",
      hashtags: ["#babymo", "#islamicstories", "#muslimkids", "#bedtimestory"],
    },
  ],
  "what-would-prophet-do": [
    {
      title: "What would Prophet Muhammad ﷺ do?",
      hook: "When the soup spills on the floor.",
      slides: [
        { heading: "The scene", body: "Your child accidentally spills hot soup on the table.", footer: "Baby Mo · What Would" },
        { heading: "Most parents", body: "Sigh, raise voice, clean up while muttering.", footer: "Baby Mo · What Would" },
        { heading: "Prophet ﷺ would", body: "Smile. Check if the child is okay first. Clean it together. No shame.", footer: "Baby Mo · What Would" },
        { heading: "The lesson", body: "His mercy was loudest in the small accidents of daily life.", footer: "Baby Mo · What Would" },
      ],
      caption: "The Prophet ﷺ in our daily kitchen moments 🤍",
      cta: "Save for the next spill.",
      hashtags: ["#babymo", "#whatwouldprophetdo", "#sunnah", "#gentleparenting"],
    },
  ],
  "emotional-story-carousel": [
    {
      title: "The night I prayed in the laundry room",
      hook: "Allah meets us in the corners we hide in.",
      slides: [
        { heading: "It was 11pm", body: "The baby finally slept. I sat down on the laundry room floor.", footer: "Baby Mo · Stories" },
        { heading: "I couldn't pray standing", body: "I was too tired. So I sat. And I cried.", footer: "Baby Mo · Stories" },
        { heading: "Then I whispered", body: "Ya Allah. That's all I had. Just His name.", footer: "Baby Mo · Stories" },
        { heading: "And it was enough", body: "Because He hears even the prayers that have no words.", footer: "Baby Mo · Stories" },
        { heading: "For the tired mama tonight", body: "You don't need fancy dua. You need His Name.", footer: "Baby Mo · Stories" },
      ],
      caption: "For the mama on the laundry floor tonight 🤍",
      cta: "Save & send to a friend.",
      hashtags: ["#babymo", "#muslimmama", "#emotionalstory"],
    },
  ],
  "pov-muslim-childhood": [
    {
      title: "POV: It's Maghrib and you're 7",
      hook: "And the whole house slows down.",
      slides: [
        { heading: "POV", body: "It's Maghrib. You're 7. The kitchen smells like rice.", footer: "Baby Mo · POV" },
        { heading: "Ayah calls", body: "'Mari solat dulu.' You all line up.", footer: "Baby Mo · POV" },
        { heading: "After salam", body: "Mama hugs you. Says 'good girl'. You feel safe.", footer: "Baby Mo · POV" },
        { heading: "That's the memory", body: "We're building today, one Maghrib at a time.", footer: "Baby Mo · POV" },
      ],
      caption: "Build the maghribs they'll remember 🌅",
      cta: "Save for tonight's maghrib.",
      hashtags: ["#babymo", "#povmuslimchildhood", "#cozyislam", "#maghrib"],
    },
  ],
  "soft-islamic-affirmations": [
    {
      title: "Soft affirmations before bed",
      hook: "Whisper these into the dark.",
      slides: [
        { heading: "Tonight,", body: "Allah is with me.", footer: "Baby Mo · Affirmations" },
        { heading: "Tomorrow,", body: "Allah is enough for me.", footer: "Baby Mo · Affirmations" },
        { heading: "Always,", body: "Allah is closer than my breath.", footer: "Baby Mo · Affirmations" },
      ],
      caption: "Soft truths for tired hearts 🤍",
      cta: "Save & whisper tonight.",
      hashtags: ["#babymo", "#islamicaffirmations", "#muslimmama"],
    },
  ],
  "five-second-habit": [
    {
      title: "5-second Sunnah",
      hook: "You can do this in literally one breath.",
      slides: [
        { heading: "Step 1", body: "Say Bismillah before you open the door.", footer: "Baby Mo · 5-sec Sunnah" },
        { heading: "That's it.", body: "A whole habit, in 5 seconds.", footer: "Baby Mo · 5-sec Sunnah" },
      ],
      caption: "Tiny Sunnah, daily habit 🤍",
      cta: "Save to your reels.",
      hashtags: ["#babymo", "#5secondsunnah", "#muslimreels"],
    },
  ],
  "cozy-islamic-reels": [
    {
      title: "A cozy Islamic morning",
      hook: "Slow morning, soft adhan, warm milk.",
      slides: [
        { heading: "06:12am", body: "Fajr adhan. Window open. Cold air.", footer: "Baby Mo · Cozy" },
        { heading: "06:30am", body: "Warm milk. Quran on speaker. Bismillah whispered.", footer: "Baby Mo · Cozy" },
        { heading: "07:00am", body: "Tiny feet pad in. The day begins, gently.", footer: "Baby Mo · Cozy" },
      ],
      caption: "A cozy Muslim morning, in three frames 🤍",
      cta: "Save for tomorrow.",
      hashtags: ["#babymo", "#cozyislam", "#muslimreels"],
    },
  ],
};

export function getSeedsFor(contentTypeId: string): SampleSeed[] {
  return SEEDS[contentTypeId] ?? [];
}
