import pandas as pd
import os
import random
from datasets.appdataset.upload_data import *


def file_to_csv(ruta_archivo, nombre, fecha):
        try:
            print("Intentando crear el archivo CSV")
            # Leer el archivo TXT
            with open(ruta_archivo, 'r') as f:
                lines = f.readlines()
            
            carpeta_csv = './datasets/csv'
            # Crear la carpeta "csv" si no existe
            if not os.path.exists(carpeta_csv):
                os.makedirs(carpeta_csv)

            nombre_archivo_csv = os.path.join(carpeta_csv, f'{nombre}_{fecha}.csv') if nombre else os.path.join(carpeta_csv, f'{nombre}_{fecha}_{random.randint(1, 1000)}.csv')
            
            with open(nombre_archivo_csv, 'w', newline='') as f:
                for line in lines:
                    # Separar por espacios y eliminar saltos de línea
                    columns = line.strip().split()
                    f.write(','.join(columns) + '\n')

            # Leer el archivo CSV con pandas
            try:
                df = pd.read_csv(nombre_archivo_csv)
                print(df)
                upload_data(nombre_archivo_csv,nombre, fecha)

            except pd.errors.ParserError as e:
                print(f"Error al analizar el archivo CSV: {e}")
                return None


            print(f"Se ha creado el archivo CSV en la carpeta /datasets/csv: {nombre_archivo_csv}")
            return df
        except Exception as e:
            print(f"Error al leer el archivo TXT: {e}")

