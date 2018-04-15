DROP TABLE IF EXISTS IMAGE;  

CREATE TABLE IMAGE (
	image_id bigint PRIMARY KEY NOT NULL AUTO_INCREMENT,  
    image_name varchar(200) NOT NULL,  
    image_type varchar(20) NOT NULL,  
    image_path varchar(200) NOT NULL,
    image_lat float  NOT NULL,
    image_lng float  NOT NULL,
    image_date date NOT NULL
);
