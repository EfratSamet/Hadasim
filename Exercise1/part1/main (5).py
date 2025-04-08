import os
from collections import defaultdict

# פונקציה 1: פיצול קובץ הלוג לקבצים קטנים יותר
def split_log_file(file_path, output_dir, max_lines_per_file):
    part_files = []
    file_index = 0
    current_line_count = 0
    writer = None
    part_file_name = ""

    with open(file_path, 'r') as f:
        for line in f:
            if current_line_count == 0:
                part_file_name = os.path.join(output_dir, f"log_part_{file_index}.txt")
                writer = open(part_file_name, 'w')
                part_files.append(part_file_name)

            writer.write(line)
            current_line_count += 1

            if current_line_count >= max_lines_per_file:
                writer.close()
                current_line_count = 0
                file_index += 1

    if writer:
        writer.close()
    return part_files


# פונקציה 2: ספירת השכיחות של קודי שגיאה מקובץ אחד
def count_error_codes_in_file(file_path):
    error_counts = defaultdict(int)

    with open(file_path, 'r') as f:
        for line in f:
            error_code = extract_error_code(line)
            if error_code:
                error_counts[error_code] += 1
    return error_counts


# פונקציה 3: חיבור ספירות מכל הקבצים
def merge_dictionaries(main_dict, temp_dict):
    for key, value in temp_dict.items():
        main_dict[key] += value


# פונקציה 4: חילוץ קוד שגיאה מתוך השורה
def extract_error_code(line):
    prefix = "Error: "
    start_index = line.find(prefix)

    if start_index == -1:
        return None

    start_index += len(prefix)
    end_index = line.find(' ', start_index)

    if end_index == -1:
        end_index = len(line)

    return line[start_index:end_index]


# פונקציה 5: קבלת N השגיאות השכיחות ביותר
def get_top_n_error_codes(error_counts, n):
    sorted_errors = sorted(error_counts.items(), key=lambda x: x[1], reverse=True)
    return sorted_errors[:n]


# הפונקציה הראשית
def main():
    file_path = r'C:\Users\user1\Desktop\Hadasim\part\logs1.txt'
    n = int(input("Enter the number of errors you want to print: "))

    # 1. פיצול הקובץ הגדול לקבצים קטנים
    output_directory = "C:\\Users\\user1\\Desktop\\log_parts\\"
    os.makedirs(output_directory, exist_ok=True)
    part_files = split_log_file(file_path, output_directory, 100000)

    # 2. חישוב שכיחויות מכל קובצי החלקים
    merged_error_counts = defaultdict(int)

    for part_file in part_files:
        part_error_counts = count_error_codes_in_file(part_file)
        merge_dictionaries(merged_error_counts, part_error_counts)

    # 3. מציאת ה-N השכיחים ביותר
    top_errors = get_top_n_error_codes(merged_error_counts, n)

    # 4. הצגת התוצאות
    print(f"\nTop {n} most frequent error codes:")
    for error in top_errors:
        print(f"{error[0]}: {error[1]} occurrences")


if __name__ == "__main__":
    main()
