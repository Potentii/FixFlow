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
insert into `user` (`username`, `password`) values ('test', '1234');
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
insert into `user` (`username`, `password`) values ('alopezo', 'global');
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


-- 20 tickets
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('scelerisque quam', 'HIGH', 'Donec ut dolor. Morbi vel lectus in quam fringilla rhoncus.', 'PENDING', null, 6, 9);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('non mattis pulvinar', 'MEDIUM', 'In quis justo. Maecenas rhoncus aliquam lacus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 72 HOUR), 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('ipsum ac tellus', 'LOW', 'Vivamus metus arcu, adipiscing molestie, hendrerit at, vulputate vitae, nisl.', 'PENDING', null, 9, 3);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('in ante vestibulum', 'HIGH', 'Proin leo odio, porttitor id, consequat in, consequat ut, nulla.', 'CLOSED', ADDDATE(NOW(), INTERVAL 48 HOUR), 10, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('nunc commodo placerat', 'LOW', 'Morbi vel lectus in quam fringilla rhoncus. Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'PENDING', null, 8, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('aliquet ultrices erat', 'MEDIUM', 'Maecenas ut massa quis augue luctus tincidunt. Nulla mollis molestie lorem.', 'PENDING', null, 4, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('sed magna', 'HIGH', 'Morbi a ipsum. Integer a nibh.', 'CLOSED', ADDDATE(NOW(), INTERVAL 120 HOUR), 9, 12);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('odio', 'LOW', 'Cras in purus eu magna vulputate luctus. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 64 HOUR), 1, 15);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('id', 'HIGH', 'Nullam molestie nibh in lectus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 24 HOUR), 7, 8);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('eu', 'LOW', 'Praesent blandit lacinia erat. Vestibulum sed magna at nunc commodo placerat.', 'CLOSED', ADDDATE(NOW(), INTERVAL 12 HOUR), 1, 14);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('sapien dignissim', 'LOW', 'Pellentesque viverra pede ac diam.', 'SOLVING', null, 10, 13);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('consequat nulla nisl', 'LOW', 'Mauris enim leo, rhoncus sed, vestibulum sit amet, cursus id, turpis.', 'PENDING', null, 10, 9);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('mus', 'MEDIUM', 'Integer aliquet, massa id lobortis convallis, tortor risus dapibus augue, vel accumsan tellus nisi eu orci. Mauris lacinia sapien quis libero.', 'PENDING', null, 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('aliquet massa', 'MEDIUM', 'Integer non velit.', 'CLOSED', ADDDATE(NOW(), INTERVAL 8 HOUR), 9, 10);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('nulla ac', 'HIGH', 'Maecenas tincidunt lacus at velit. Vivamus vel nulla eget eros elementum pellentesque.', 'CLOSED', ADDDATE(NOW(), INTERVAL 72 HOUR), 5, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('quam pharetra', 'MEDIUM', 'Cras in purus eu magna vulputate luctus.', 'CLOSED', ADDDATE(NOW(), INTERVAL 12 HOUR), 2, 14);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('venenatis tristique fusce', 'LOW', 'Nulla tempus. Vivamus in felis eu sapien cursus vestibulum.', 'CLOSED', ADDDATE(NOW(), INTERVAL 10 HOUR), 10, 8);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('nec molestie', 'MEDIUM', 'Mauris sit amet eros.', 'SOLVING', null, 6, 11);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('amet sapien dignissim', 'HIGH', 'Morbi non lectus.', 'SOLVING', null, 8, 5);
insert into `ticket` (`title`, `urgency`, `description`, `status`, `date_closed`, `category_fk`, `client_fk`) values ('consequat ut', 'MEDIUM', 'Duis bibendum. Morbi non quam nec dui luctus rutrum.', 'PENDING', null, 1, 15);
