-- seed database with information
INSERT INTO department (name)

VALUES
('IT'),
('development'),
('finance');

INSERT INTO role (title, salary, department_id)

VALUES
('Admin', 98000, 1),
('engineer', 125000, 2),
('money person', 75000, 3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)

VALUES
('David', 'Man', 1, NULL),
('Lesley', 'Humanson', 2, 1),
('Big Bucks', 'Johnson', 3, 2);