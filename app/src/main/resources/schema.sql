USE personal_website;

----Delete the personal_website database if it exists.  
DROP TABLE IF EXISTS dbo.IMAGE;  

--Create a new database called personal_website.  
CREATE TABLE IMAGE (
	ImageID bigint PRIMARY KEY NOT NULL,  
    ImageName varchar(200),  
    ImageType varchar(20) NOT NULL,  
    ImagePath varchar(200) NOT NULL,
    ImageSize bigint NOT NULL
);
