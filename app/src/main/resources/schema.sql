----Delete the personal_website database if it exists.  
DROP TABLE IF EXISTS dbo.IMAGE;  

--Create a new database called personal_website.  
CREATE TABLE IMAGE (
	image_id bigint PRIMARY KEY NOT NULL IDENTITY (1,1),  
    image_name varchar(200) NOT NULL,  
    image_type varchar(20) NOT NULL,  
    image_path varchar(200) NOT NULL,
    image_lat float  NOT NULL,
    image_lng float  NOT NULL,
    image_date date NOT NULL
);
