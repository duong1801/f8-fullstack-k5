SELECT * FROM teacher

SELECT * FROM courses

INSERT INTO teacher (id,name,bio,created_at,updated_at) VALUES (1,'Lê Văn A','lorem 1',now(),now())

INSERT INTO teacher (id,name,bio,created_at,updated_at) VALUES (2,'Lê Văn B','lorem 2',now(),now())

INSERT INTO teacher (id,name,bio,created_at,updated_at) VALUES (3,'Lê Văn C','lorem 3',now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (1,'Kiến Thức Nhập Môn IT',100,'lorem','lorem',1,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (2,'Lập trình C++ cơ bản, nâng cao',100,'lorem','lorem',1,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (3,'Responsive Với Grid System',100,'lorem','lorem',1,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (4,'Lập Trình JavaScript Cơ Bản',100,'lorem','lorem',2,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (5,'Lập Trình JavaScript Nâng Cao',100,'lorem','lorem',2,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (6,'Làm việc với Terminal & Ubuntu',100,'lorem','lorem',2,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (7,'Node & ExpressJS',100,'lorem','lorem',3,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (8,'Xây Dựng Website với ReactJS',100,'lorem','lorem',3,1,now(),now())

INSERT INTO courses (id,name,price,description,content,teacher_id,active,created_at,updated_at)
VALUES (9,'HTML CSS từ Zero đến Hero',100,'lorem','lorem',3,1,now(),now())

UPDATE courses SET price = 200,updated_at = now() WHERE id =2 

UPDATE courses SET price = 300,updated_at = now() WHERE id =3

UPDATE courses SET price = 500,updated_at = now() WHERE id =7

UPDATE courses SET price = 400,updated_at = now() WHERE id =9
