/*Department Table Seeds*/
INSERT INTO departments (dname)
VALUES
("Sales")
("Engineering")
("Finance")
("Legal")

/*Role Table Seeds*/
INSERT INTO roles (title, salary, department_id)
VALUES
("Sales Lead", 100000, 1)
("Salesperson", 80000, 1)
("Lead Engineer", 150000, 2)
("Software Engineer", 120000, 2)
("Account Manager", 160000, 3)
("Accountant", 125000, 3)
("Legal Team Lead", 250000, 4)
("Lawyer", 190000, 4)

/*Employees Table Seeds  Leads have no manager=NULL*/
INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
("Chet", "Maximus", 1, NULL)
("Billy", "Blanks", 1, 1)
("Nick", "Tesla", 2, NULL)
("HAL", "9000", 2, 2)
("Mike", "Scott", 3, NULL)
("Oscar", "Martinez", 3, 3)
("Rand", "Spear", 4, NULL)
("Saul", "Goodman", 4, 4)

