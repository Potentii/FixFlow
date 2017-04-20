-- -----------------------------------------------------
-- Connection charset
-- -----------------------------------------------------
set names 'utf8';


-- -----------------------------------------------------
-- Schema fixflow_schema
-- -----------------------------------------------------
USE `fixflow_schema`;


-- 4 departments
insert into `department` (`name`) values ('volutpat dui');
insert into `department` (`name`) values ('nulla nisl');
insert into `department` (`name`) values ('sem sed');
insert into `department` (`name`) values ('nulla');


-- 10 categories
insert into `category` (`name`, `department_fk`) values ('sit amet', 1);
insert into `category` (`name`, `department_fk`) values ('laoreet ut', 2);
insert into `category` (`name`, `department_fk`) values ('interdum venenatis turpis', 2);
insert into `category` (`name`, `department_fk`) values ('molestie nibh', 4);
insert into `category` (`name`, `department_fk`) values ('tellus nulla ut', 4);
insert into `category` (`name`, `department_fk`) values ('diam', 4);
insert into `category` (`name`, `department_fk`) values ('elit sodales scelerisque', 1);
insert into `category` (`name`, `department_fk`) values ('sit amet', 1);
insert into `category` (`name`, `department_fk`) values ('magnis dis parturient', 2);
insert into `category` (`name`, `department_fk`) values ('dui', 3);


-- 35 users
insert into `user` (`username`, `password`) values ('test1', '1234');
insert into `user` (`username`, `password`) values ('bharrison1', 'radical');
insert into `user` (`username`, `password`) values ('druiz2', 'didactic');
insert into `user` (`username`, `password`) values ('nstewart3', 'migration');
insert into `user` (`username`, `password`) values ('eharris4', 'hub');
insert into `user` (`username`, `password`) values ('pspencer5', 'extranet');
insert into `user` (`username`, `password`) values ('lhowell6', 'Customizable');
insert into `user` (`username`, `password`) values ('mpatterson7', 'Front-line');
insert into `user` (`username`, `password`) values ('amedina8', 'installation');
insert into `user` (`username`, `password`) values ('earnold9', 'Balanced');
insert into `user` (`username`, `password`) values ('phenrya', 'Phased');
insert into `user` (`username`, `password`) values ('jwashingtonb', 'Multi-channelled');
insert into `user` (`username`, `password`) values ('jlittlec', 'actuating');
insert into `user` (`username`, `password`) values ('njohnsond', 'user-facing');
insert into `user` (`username`, `password`) values ('whunte', 'Virtual');
insert into `user` (`username`, `password`) values ('lmeyerf', 'User-centric');
insert into `user` (`username`, `password`) values ('jbowmang', 'Organic');
insert into `user` (`username`, `password`) values ('jjamesh', 'pricing structure');
insert into `user` (`username`, `password`) values ('jandersoni', 'policy');
insert into `user` (`username`, `password`) values ('lmurphyj', 'foreground');
insert into `user` (`username`, `password`) values ('ahallk', 'bi-directional');
insert into `user` (`username`, `password`) values ('wbanksl', 'orchestration');
insert into `user` (`username`, `password`) values ('kbradleym', 'methodical');
insert into `user` (`username`, `password`) values ('jhuntn', 'Devolved');
insert into `user` (`username`, `password`) values ('test2', '1234');
insert into `user` (`username`, `password`) values ('jshawp', 'capability');
insert into `user` (`username`, `password`) values ('rbutlerq', 'Graphical User Interface');
insert into `user` (`username`, `password`) values ('sgardnerr', 'global');
insert into `user` (`username`, `password`) values ('mweavers', 'budgetary management');
insert into `user` (`username`, `password`) values ('hthompsont', 'tertiary');
insert into `user` (`username`, `password`) values ('vharrisu', 'Enhanced');
insert into `user` (`username`, `password`) values ('jstanleyv', 'dynamic');
insert into `user` (`username`, `password`) values ('anicholsw', '3rd generation');
insert into `user` (`username`, `password`) values ('tkingx', 'access');
insert into `user` (`username`, `password`) values ('dmoorey', 'Phased');


-- 20 operators
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Harry Hernandez', 4, 1);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Brenda Warren', 1, 2);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Tammy Alexander', 3, 3);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Angela Ferguson', 3, 4);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Stephen Ross', 2, 5);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Jeremy Bell', 2, 6);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Gerald Cunningham', 2, 7);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Tammy Lopez', 4, 8);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Willie Ross', 4, 9);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Ralph Price', 2, 10);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Carolyn Scott', 2, 11);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Susan Hawkins', 3, 12);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Amanda Armstrong', 2, 13);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Rebecca Stewart', 2, 14);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Benjamin Baker', 4, 15);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Bobby Williams', 2, 16);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Louise Pierce', 2, 17);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Todd Edwards', 4, 18);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Mary Boyd', 1, 19);
insert into `operator` (`name`, `department_fk`, `user_fk`) values ('Christopher Mccoy', 2, 20);


-- 15 clients
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Bobby Rivera', '1-(211)796-0099', 'brivera0@addthis.com', 21);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Scott Oliver', '86-(195)974-2606', 'soliver1@liveinternet.ru', 22);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Amy Evans', '62-(803)414-0136', 'aevans2@tmall.com', 23);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Bobby Cox', '63-(173)303-4973', 'bcox3@baidu.com', 24);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Sharon Larson', '86-(815)337-6545', 'slarson4@gov.uk', 25);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Joshua Lane', '353-(662)434-3818', 'jlane5@behance.net', 26);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Martin Peters', '86-(933)106-0423', 'mpeters6@ucoz.ru', 27);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Benjamin Ryan', '55-(405)433-0208', 'bryan7@nytimes.com', 28);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Raymond Jones', '86-(959)980-2013', 'rjones8@globo.com', 29);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Evelyn Walker', '86-(537)169-7868', 'ewalker9@upenn.edu', 30);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Aaron Watson', '20-(299)912-5748', 'awatsona@oakley.com', 31);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Mary Evans', '86-(868)424-8080', 'mevansb@g.co', 32);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Ann Jenkins', '60-(937)691-9582', 'ajenkinsc@oaic.gov.au', 33);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Howard Chavez', '86-(717)338-0078', 'hchavezd@cornell.edu', 34);
insert into `client` (`name`, `phone`, `email`, `user_fk`) values ('Michelle Jordan', '86-(681)488-6920', 'mjordane@vk.com', 35);


-- 60 tickets
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Scelerisque quam', 'HIGH', 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'PENDING', null, 6, 9);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Non mattis pulvinar', 'MEDIUM', 'In quis justo. Maecenas rhoncus aliquam lacus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 72 HOUR), 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Ipsum ac tellus', 'LOW', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'PENDING', null, 9, 3);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('In ante vestibulum', 'HIGH', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', 'CLOSED', ADDDATE(NOW(), INTERVAL 48 HOUR), 10, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nunc commodo placerat', 'LOW', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'PENDING', null, 8, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Aliquet ultrices erat', 'MEDIUM', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.', 'PENDING', null, 4, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Sed magna', 'HIGH', 'Morbi a ipsum. Integer a nibh.', 'CLOSED', ADDDATE(NOW(), INTERVAL 120 HOUR), 9, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Odio', 'LOW', 'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 64 HOUR), 1, 15);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Id', 'HIGH', 'Nullam molestie nibh in lectus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 24 HOUR), 7, 8);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Eu', 'LOW', 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 'CLOSED', ADDDATE(NOW(), INTERVAL 12 HOUR), 1, 14);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Sapien dignissim', 'LOW', 'Pellentesque viverra pede ac diam.', 'SOLVING', null, 10, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Consequat nulla nisl', 'LOW', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'PENDING', null, 10, 9);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Mus', 'MEDIUM', 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'PENDING', null, 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Aliquet massa', 'MEDIUM', 'Integer non velit.', 'CLOSED', ADDDATE(NOW(), INTERVAL 8 HOUR), 9, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nulla ac', 'HIGH', 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'CLOSED', ADDDATE(NOW(), INTERVAL 72 HOUR), 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Quam pharetra', 'MEDIUM', 'Cras in purus eu magna vulputate luctus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 12 HOUR), 2, 14);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Venenatis tristique fusce', 'LOW', 'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'CLOSED', ADDDATE(NOW(), INTERVAL 10 HOUR), 10, 8);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nec molestie', 'MEDIUM', 'Mauris sit amet eros.', 'SOLVING', null, 6, 11);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Amet sapien dignissim', 'HIGH', 'Morbi non lectus.', 'SOLVING', null, 8, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Consequat ut', 'MEDIUM', 'Duis bibendum. Morbi non quam nec dui luctus rutrum.', 'PENDING', null, 1, 15);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Vestibulum ante ipsum primis in pharetra, magna vestibulum aliquet ultrices.', 'HIGH', 'Vivamus tortor, erat tortor sollicitudin mi, sit amet lobortis sapien sapien non mi.', 'PENDING', null, 5, 8);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Phasellus in felis.', 'MEDIUM', 'Pellentesque eget nunc. Donec quis orci eget orci vehicula condimentum.', 'SOLVING', null, 2, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Morbi vestibulum, velit id pretium iaculis.', 'HIGH', 'Praesent id massa id nisl venenatis lacinia. Aenean sit amet justo, diam erat fermentum justo, nec condimentum neque sapien placerat ante. Morbi ut odio.', 'PENDING', null, 6, 4);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Mauris sit amet eros.', 'HIGH', 'Donec diam neque, vestibulum eget, vulputate ut, ultrices vel, augue.', 'PENDING', null, 1, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc.', 'MEDIUM', 'Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo. In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'SOLVING', null, 2, 6);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Aenean lectus.', 'HIGH', 'Etiam vel augue. Vestibulum rutrum rutrum neque.', 'SOLVING', null, 2, 1);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nullam varius.', 'HIGH', 'Sed vel enim sit amet nunc viverra dapibus. Nulla suscipit ligula in lacus. Curabitur at ipsum ac tellus semper interdum.', 'SOLVING', null, 6, 11);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Integer a nibh.', 'LOW', 'In blandit ultrices enim. Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'PENDING', null, 4, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Morbi vel lectus in quam fringilla rhoncus.', 'HIGH', 'Proin risus.', 'PENDING', null, 3, 15);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nullam porttitor lacus at turpis.', 'MEDIUM', 'Proin risus. Praesent lectus. Vestibulum quam sapien, varius ut, blandit non, interdum in, ante.', 'SOLVING', null, 8, 15);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Etiam faucibus cursus urna.', 'LOW', 'Morbi non quam nec dui luctus rutrum. Nulla tellus.', 'SOLVING', null, 7, 2);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Integer non velit.', 'MEDIUM', 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'CLOSED', ADDDATE(NOW(), INTERVAL 10 HOUR), 4, 1);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Integer ac neque.', 'HIGH', 'In congue.', 'PENDING', null, 3, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Suspendisse accumsan tortor quis turpis.', 'HIGH', 'Praesent blandit lacinia erat.', 'CLOSED', ADDDATE(NOW(), INTERVAL 2 HOUR), 7, 3);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Cras mi pede, malesuada in, imperdiet et, commodo vulputate, justo.', 'MEDIUM', 'Morbi non lectus. Aliquam sit amet diam in magna bibendum imperdiet. Nullam orci pede, venenatis non, sodales sed, tincidunt eu, felis.', 'SOLVING', null, 9, 2);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Cras non velit nec nisi vulputate nonummy.', 'HIGH', 'In hac habitasse platea dictumst.', 'CLOSED', ADDDATE(NOW(), INTERVAL 3 HOUR), 5, 2);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Duis bibendum.', 'HIGH', 'Donec quis orci eget orci vehicula condimentum.', 'PENDING', null, 3, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Lorem ipsum dolor sit amet, consectetuer adipiscing elit.', 'HIGH', 'Morbi odio odio, elementum eu, interdum eu, tincidunt in, leo.', 'CLOSED', ADDDATE(NOW(), INTERVAL 8 HOUR), 8, 4);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci.', 'MEDIUM', 'In hac habitasse platea dictumst.', 'CLOSED', ADDDATE(NOW(), INTERVAL 12 HOUR), 2, 6);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Integer a nibh.', 'HIGH', 'Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam. Nam tristique tortor eu pede.', 'CLOSED', ADDDATE(NOW(), INTERVAL 6 HOUR), 2, 2);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('In hac habitasse platea dictumst.', 'HIGH', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'CLOSED', ADDDATE(NOW(), INTERVAL 9 HOUR), 5, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Aliquam sit amet diam in magna bibendum imperdiet.', 'HIGH', 'Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 'SOLVING', null, 3, 9);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Morbi a ipsum.', 'LOW', 'Pellentesque at nulla. Suspendisse potenti. Cras in purus eu magna vulputate luctus.', 'PENDING', null, 9, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Mauris ullamcorper purus sit amet nulla.', 'MEDIUM', 'Phasellus in felis.', 'CLOSED', ADDDATE(NOW(), INTERVAL 32 HOUR), 2, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Suspendisse potenti.', 'LOW', 'Nam ultrices, libero non mattis pulvinar, nulla pede ullamcorper augue, a suscipit nulla elit ac nulla. Sed vel enim sit amet nunc viverra dapibus.', 'PENDING', null, 4, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', 'HIGH', 'Proin eu mi. Nulla ac enim. In tempor, turpis nec euismod scelerisque, quam turpis adipiscing lorem, vitae mattis nibh ligula nec sem.', 'PENDING', null, 6, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Duis mattis egestas metus.', 'HIGH', 'Maecenas tristique, est et tempus semper, est quam pharetra magna, ac consequat metus sapien ut nunc. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia Curae; Mauris viverra diam vitae quam. Suspendisse potenti.', 'SOLVING', null, 2, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Curabitur at ipsum ac tellus semper interdum.', 'HIGH', 'Aenean lectus. Pellentesque eget nunc.', 'CLOSED', ADDDATE(NOW(), INTERVAL 15 HOUR), 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'LOW', 'Nam dui. Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', 'SOLVING', null, 2, 9);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Curabitur gravida nisi at nibh.', 'LOW', 'Integer pede justo, lacinia eget, tincidunt eget, tempus vel, pede.', 'CLOSED', ADDDATE(NOW(), INTERVAL 20 HOUR), 7, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Duis mattis egestas metus.', 'MEDIUM', 'Praesent id massa id nisl venenatis lacinia.', 'CLOSED', ADDDATE(NOW(), INTERVAL 3 HOUR), 1, 15);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Integer tincidunt ante vel ipsum.', 'HIGH', 'Duis ac nibh. Fusce lacus purus, aliquet at, feugiat non, pretium quis, lectus. Suspendisse potenti.', 'SOLVING', null, 6, 3);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl.', 'MEDIUM', 'In sagittis dui vel nisl. Duis ac nibh.', 'CLOSED', ADDDATE(NOW(), INTERVAL 7 HOUR), 3, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Maecenas leo odio, condimentum id, luctus nec, molestie sed, justo.', 'MEDIUM', 'Proin risus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 4 HOUR), 9, 4);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla.', 'MEDIUM', 'Phasellus in felis. Donec semper sapien a libero.', 'CLOSED', ADDDATE(NOW(), INTERVAL 22 HOUR), 3, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Morbi non quam nec dui luctus rutrum.', 'MEDIUM', 'In quis justo. Maecenas rhoncus aliquam lacus.', 'PENDING', null, 2, 8);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nam nulla.', 'MEDIUM', 'Integer ac neque. Duis bibendum.', 'CLOSED', ADDDATE(NOW(), INTERVAL 6 HOUR), 9, 6);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Duis aliquam convallis nunc.', 'HIGH', 'Cras pellentesque volutpat dui.', 'SOLVING', null, 2, 3);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Nulla neque libero, convallis eget, eleifend luctus, ultricies eu, nibh.', 'MEDIUM', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl. Aenean lectus. Pellentesque eget nunc.', 'CLOSED', ADDDATE(NOW(), INTERVAL 5 HOUR), 8, 1);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('Pellentesque at nulla.', 'HIGH', 'Curabitur convallis. Duis consequat dui nec nisi volutpat eleifend.', 'SOLVING', null, 3, 7);

-- 12 feedbacks
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Sed ante. Vivamus tortor.', 0, false, 51);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('In hac habitasse platea dictumst.', 3, false, 32);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Quisque arcu libero, rutrum ac, lobortis vel, dapibus at, diam.', 1, true, 50);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('In est risus, auctor sed, tristique in, tempus sit amet, sem. Fusce consequat. Nulla nisl.', 2, true, 40);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Quisque porta volutpat erat. Quisque erat eros, viverra eget, congue eget, semper rutrum, nulla. Nunc purus.', 3, true, 4);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Fusce consequat. Nulla nisl. Nunc nisl.', 4, false, 16);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Sed ante. Vivamus tortor. Duis mattis egestas metus.', 3, false, 7);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Morbi sem mauris, laoreet ut, rhoncus aliquet, pulvinar sed, nisl. Nunc rhoncus dui vel sem. Sed sagittis.', 4, true, 44);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Quisque ut erat. Curabitur gravida nisi at nibh. In hac habitasse platea dictumst.', 3, true, 2);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Integer a nibh. In quis justo.', 0, true, 34);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Nam congue, risus semper porta volutpat, quam pede lobortis ligula, sit amet eleifend pede libero quis orci.', 1, false, 57);
insert into `feedback` (`message`, `rating`, `solved`, `ticket_fk`) values ('Duis bibendum, felis sed interdum venenatis, turpis enim blandit mi, in porttitor pede justo eu massa.', 0, true, 36);
