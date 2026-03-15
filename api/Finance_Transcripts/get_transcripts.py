from youtube_transcript_api import YouTubeTranscriptApi
import os
import time

# Create the folder for your transcripts
folder_name = "Course_Transcripts"
if not os.path.exists(folder_name):
    os.makedirs(folder_name)

# Initialize the API
ytt_api = YouTubeTranscriptApi()

# Resuming exactly after "Chapter3_and_4_סרטון_פתיחה_Hero"
videos = {
    # --- Chapter 3 (Continued) ---
    "tQA-zVeBDNo": "Chapter3_שיעור_1_פתיחת_תיק_השקעות",
    "3_otsVBu5Oc": "Chapter3_שיעור_1_פתיחת_תיק_השקעות_המשך",
    "OFUkjsbZE1E": "Chapter3_שיעור_2_גיבוש_אסטרטגיית_השקעות",
    "QO2DUO8ePIQ": "Chapter3_שיעור_2_גיבוש_אסטרטגיית_השקעות_המשך",
    "PFU6a-w5E-A": "Chapter3_שיעור_3_יישום_השיטה_המלאה",
    "Ugbum4rzklQ": "Chapter3_צעד_1_בחירת_קייס_מנצח",
    "OGB0nPmBbSA": "Chapter3_צעד_2_בדיקת_בריאות_פיננסית",
    "X81c5BHNhVo": "Chapter3_צעד_3_מעקב_אחרי_התיק",
    "0LwylNJaW_w": "Chapter3_צעד_4_מציאת_נקודת_כניסה",

    # --- Chapter 4 ---
    "LHo1aKhcAU8": "Chapter4_שיעור_1_פתיחת_תיק_השקעות",
    "-CZdSofnFAw": "Chapter4_שיעור_1_פתיחת_תיק_השקעות_המשך",
    "PBHKjoNMyK0": "Chapter4_שיעור_2_גיבוש_אסטרטגיית_השקעות",
    "bgtBI6d12BU": "Chapter4_סיכום_הקורס",
}

print(f"Resuming extraction for the remaining {len(videos)} videos...")

for video_id, file_name in videos.items():
    file_path = os.path.join(folder_name, f"{file_name}.txt")
    
    # Check if the file was already downloaded just in case
    if os.path.exists(file_path):
        print(f"⏭️ Skipping {file_name}: Already exists!")
        continue

    try:
        # Fetch the transcript, prioritizing auto-generated Hebrew ('iw')
        fetched_transcript = ytt_api.fetch(video_id, languages=['iw', 'he', 'en'])
        
        # Combine the text blocks
        full_text = "\n".join([snippet.text for snippet in fetched_transcript])
        
        # Save to file
        with open(file_path, "w", encoding="utf-8") as file:
            file.write(full_text)
            
        print(f"✅ Success: {file_name}")
        
        # Pause for 4 seconds to prevent YouTube from IP blocking again
        time.sleep(4)
        
    except Exception as e:
        print(f"❌ Error with {file_name} (ID: {video_id}): {e}")

print("Finished! All remaining transcripts should be in your folder.")