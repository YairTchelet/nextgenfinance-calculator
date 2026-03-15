import os

input_folder = "Course_Transcripts"
output_file = "claude_knowledge_base.txt"

print(f"Stitching transcripts together into {output_file}...")

# Open the new master file in write mode
with open(output_file, "w", encoding="utf-8") as outfile:
    # Start the main knowledge base tag
    outfile.write("<knowledge_base>\n\n")
    
    # Check if the folder exists to avoid errors
    if os.path.exists(input_folder):
        # Sort the files alphabetically so Chapters 1, 2, 3, etc. stay in order
        for filename in sorted(os.listdir(input_folder)):
            if filename.endswith(".txt"):
                file_path = os.path.join(input_folder, filename)
                
                # Use the file name (without .txt) as the lesson title
                lesson_name = filename.replace(".txt", "")
                
                # Read the individual transcript
                with open(file_path, "r", encoding="utf-8") as infile:
                    content = infile.read()
                
                # Write it to the master file with XML formatting
                outfile.write(f"  <lesson name=\"{lesson_name}\">\n")
                outfile.write(f"{content}\n")
                outfile.write(f"  </lesson>\n\n")
                
        print(f"✅ Success! All files merged.")
    else:
        print(f"❌ Error: Could not find the '{input_folder}' folder.")

    # Close the main knowledge base tag
    outfile.write("</knowledge_base>")

print(f"Finished! You can now open {output_file} and feed it to Claude.")