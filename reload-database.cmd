cd ./sql
mysql --host=localhost --user=root --password=root -e "source tables.sql"
mysql --host=localhost --user=root --password=root -e "source procedures.sql"
mysql --host=localhost --user=root --password=root -e "source triggers.sql"
mysql --host=localhost --user=root --password=root -e "source views.sql"
mysql --host=localhost --user=root --password=root -e "source mock.sql"
pause
