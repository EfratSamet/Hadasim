-- יצירת בסיס נתונים
CREATE DATABASE FamilyTreeDB;
USE FamilyTreeDB;

-- יצירת טבלת האנשים
CREATE TABLE People (
    Person_Id INT PRIMARY KEY,
    Personal_Name VARCHAR(50),
    Family_Name VARCHAR(50),
    Gender VARCHAR(10) CHECK (Gender IN ('זכר', 'נקבה')),
    Father_Id INT,
    Mother_Id INT,
    Spouse_Id INT,
    FOREIGN KEY (Father_Id) REFERENCES People(Person_Id),
    FOREIGN KEY (Mother_Id) REFERENCES People(Person_Id),
    FOREIGN KEY (Spouse_Id) REFERENCES People(Person_Id)
);
GO

-- יצירת טבלת העץ המשפחתי
CREATE TABLE FamilyTree (
    Person_Id INT,
    Relative_Id INT,
    Connection_Type VARCHAR(20),
    PRIMARY KEY (Person_Id, Relative_Id, Connection_Type),
    FOREIGN KEY (Person_Id) REFERENCES People(Person_Id),
    FOREIGN KEY (Relative_Id) REFERENCES People(Person_Id)
);

-- פרוצדורה שמבצעת:
-- 1. השלמת בני זוג דו-צדדית
-- 2. מילוי טבלת FamilyTree בכל הקשרים האפשריים
CREATE PROCEDURE BuildFamilyTree
AS
BEGIN
    -- השלמת בני זוג דו-כיוונית
    UPDATE P2
    SET P2.Spouse_Id = P1.Person_Id
    FROM People P1
    JOIN People P2 ON P1.Spouse_Id = P2.Person_Id
    WHERE P2.Spouse_Id IS NULL;

    --  ניקוי טבלת FamilyTree לפני מילוי
    DELETE FROM FamilyTree;

    --  הכנסת קשרי משפחה מדרגה ראשונה

    -- אב
    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Father_Id, 'אב'
    FROM People
    WHERE Father_Id IS NOT NULL;

    -- אם
    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Mother_Id, 'אם'
    FROM People
    WHERE Mother_Id IS NOT NULL;

    -- בן זוג / בת זוג
    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Person_Id, Spouse_Id,
           CASE WHEN Gender = 'זכר' THEN 'בת זוג' ELSE 'בן זוג' END
    FROM People
    WHERE Spouse_Id IS NOT NULL;

    -- בן / בת (הילדים)
    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT Child.Person_Id, Parent.Person_Id,
           CASE WHEN Child.Gender = 'זכר' THEN 'בן' ELSE 'בת' END
    FROM People AS Child
    JOIN People AS Parent 
        ON Child.Father_Id = Parent.Person_Id OR Child.Mother_Id = Parent.Person_Id;

    -- אחים ואחיות
    INSERT INTO FamilyTree (Person_Id, Relative_Id, Connection_Type)
    SELECT P1.Person_Id, P2.Person_Id,
           CASE WHEN P1.Gender = 'זכר' THEN 'אח' ELSE 'אחות' END
    FROM People AS P1
    JOIN People AS P2 
        ON (P1.Father_Id IS NOT NULL AND P1.Father_Id = P2.Father_Id)
        OR (P1.Mother_Id IS NOT NULL AND P1.Mother_Id = P2.Mother_Id)
    WHERE P1.Person_Id <> P2.Person_Id;
END;
-- הרצת הפרוצדורה
EXEC BuildFamilyTree;

-- הצגת טבלת FamilyTree
SELECT * FROM FamilyTree;