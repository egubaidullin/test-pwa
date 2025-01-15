import csv

# Чтение CSV-файла и генерация SQL-запросов
csv_file = 'data.csv'
sql_file = 'insert_data.sql'

with open(csv_file, 'r') as csvfile, open(sql_file, 'w') as sqlfile:
    reader = csv.DictReader(csvfile)
    sqlfile.write('-- Insert data into emergency_services\n')
    for row in reader:
        query = f"INSERT INTO emergency_services (id, name, address, latitude, longitude, phone, service_type) VALUES ({row['id']}, '{row['name'].replace("'", "''")}', '{row['address'].replace("'", "''")}', {row['latitude']}, {row['longitude']}, '{row['phone']}', '{row['service_type']}');\n"
        sqlfile.write(query)

