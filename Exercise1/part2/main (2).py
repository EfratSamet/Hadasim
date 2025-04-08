import pandas as pd

# קריאת הקובץ (עדכון לפורמטים שונים: CSV ו-Parquet)
def read_data(file_path):
    if file_path.endswith('.csv'):
        df = pd.read_csv(file_path, parse_dates=['timestamp'], dayfirst=True)
    elif file_path.endswith('.parquet'):
        df = pd.read_parquet(file_path)
    else:
        raise ValueError("פורמט קובץ לא נתמך!")
    return df

# פונקציה לניקוי נתונים
def clean_data(df):
    if df['timestamp'].duplicated().any():
        print("יש כפילויות בחותמות הזמן!")
        df = df.drop_duplicates(subset='timestamp').copy()

    df['value'] = pd.to_numeric(df['value'], errors='coerce')
    if df['value'].isnull().any():
        print("יש ערכים שאינם מספרים!")
        df = df.dropna(subset=['value']).copy()

    return df

# קריאה של שני הקבצים
csv_file_path = r'C:\Users\user1\Desktop\Hadasim\part1\time_series.csv'  # נתיב לקובץ CSV
parquet_file_path = r'C:\Users\user1\Desktop\Hadasim\part1\time_series.parquet'  # נתיב לקובץ Parquet

# קריאה של שני הקבצים
df_csv = read_data(csv_file_path)
df_parquet = read_data(parquet_file_path)

# חיבור שני הקבצים
df = pd.concat([df_csv, df_parquet])

# ניקוי הנתונים
df = clean_data(df)

# לוודא שהעמודה 'timestamp' היא בתצורת datetime
df['timestamp'] = pd.to_datetime(df['timestamp'], errors='coerce')

# אם יש עדיין ערכים בעייתיים, נמיר ל-NaT
if df['timestamp'].isnull().any():
    print("יש בעיה בהמרת חותמות הזמן. ישנם ערכים חסרים ב' timestamp '")

# יצירת עמודת 'hour' לצורך חישוב ממוצעים שעתיים
df['hour'] = df['timestamp'].dt.floor('h')

# חישוב ממוצעים שעתיים עבור כל יום
hourly_means = df.groupby('hour')['value'].mean()

# הדפסת התוצאה
print(hourly_means)

# שמירת הקובץ החדש
output_path = r'C:\Users\user1\Desktop\Hadasim\part1\hourly_means_final.xlsx'
hourly_means.to_excel(output_path, sheet_name='Hourly Means')

print("הקובץ הסופי נשמר כ:", output_path)
