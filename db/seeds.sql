INSERT INTO departments (id, department_title)
VALUES (001, "Accounting"),
       (002, "Sales"),
       (003, "Engineering"),
       (004, "IT"),
       (005, 'Executive');

INSERT INTO role (id, title, salary, department_id)
VALUES (001, 'Software Engineer', '100000', '003'),
       (002, 'Accountant', '80000', '001'),
       (003, 'Salesperson', '60000', '002'),
       (004, 'IT person', '55000', '004'),
       (005, 'CEO', '300000', '005');

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (001, 'Jack', 'Pawley', '004', '001'),
       (002, 'Kieran', 'Miles', '003', '001'),
       (003, 'Drake', 'Hanson', '002', '001'),
       (004, 'Julia', 'Ferrendelli', '001', '001'),
       (005, 'Amanda', 'Sanchez', '001', '004'),
       (006, 'Max', 'Casas', '001', '004'),
       (007, 'Nico', 'DeAnda', '004', '001'),
       (008, 'Daniel', 'Bardowell', '003', '002'),
       (009, 'Jake', 'Jackson', '002', '003');

       