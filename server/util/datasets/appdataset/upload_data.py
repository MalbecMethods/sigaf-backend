from datasets.models import Dataset
import pandas as pd
__all__ = ['upload_data']

#subimos los datos a la base de datos
def upload_data(ruta_archivo, nombre, fecha):
    route_file = ruta_archivo
    df = pd.read_csv(route_file)
    for index, row in df.iterrows():
        Dataset.objects.create(
            time=row['Time'],
            pressure=row['Pressure'],
            temperature=row['Temperature'],
            depth=row['Depth'],
            fecha_registro=fecha,
            pozo=nombre
        )

    print('Data uploaded successfully')

