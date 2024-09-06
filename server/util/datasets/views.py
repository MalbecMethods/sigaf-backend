from django.http import JsonResponse
from rest_framework.decorators import api_view, parser_classes
from rest_framework.parsers import MultiPartParser, FormParser
import os
from datasets.models import Dataset
from .serializers import DatasetSerializer
from datasets.appdataset.test import file_to_csv
from rest_framework import generics
from datasets.models import Dataset
from .serializers import DatasetSerializer
from datasets.news.web import traer_noticias



@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_file(request):
    if 'file' not in request.FILES:
        return JsonResponse({'error': 'No se proporcionó ningún archivo'}, status=400)
    
    file = request.FILES['file']
    nombre = request.data.get('nombre')
    fecha = request.data.get('fecha')
    
    if not nombre or not fecha:
        return JsonResponse({'error': 'Nombre y fecha son requeridos'}, status=400)
    
    # Crear la carpeta "uploads" si no existe
    if not os.path.exists('datasets/uploads'):
        os.makedirs('datasets/uploads')

    # Guardar el archivo en el sistema de archivos
    with open(f'datasets/uploads/{file.name}', 'wb+') as destination:
        for chunk in file.chunks():
            destination.write(chunk)
    
    if file.name.endswith('.txt') or file.name.endswith('.csv'):
        file_to_csv(f'datasets/uploads/{file.name}', nombre, fecha)
        return JsonResponse({'message': 'Archivo subido exitosamente'})
    else:
        os.remove(f'datasets/uploads/{file.name}')
        return JsonResponse({'error': 'El archivo no tiene formato .txt o .csv'}, status=400)

@api_view(['GET'])
def get_datasets(request):
    try:
        datasets = Dataset.objects.all()
        if datasets:
            serializer = DatasetSerializer(datasets, many=True)
            return JsonResponse(serializer.data, safe=False)
        else:
            return JsonResponse({'message': 'No se encontraron conjuntos de datos'}, status=404)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def send_data(request):

    nombre = request.data.get('nombre')
    fecha = request.data.get('fecha')
    time = request.data.get('time')
    pressure = request.data.get('pressure')
    temperature = request.data.get('temperature')
    depth = request.data.get('depth')
    
    if not pressure or not temperature or not depth:
        return JsonResponse({'error': 'Presión, temperatura y profundidad son requeridos'}, status=400)
    
    if not nombre or not fecha:
        return JsonResponse({'error': 'Nombre y fecha son requeridos'}, status=400)
    
    Dataset.objects.create(
        time=time,
        pressure=pressure,
        temperature=temperature,
        depth=depth,
        fecha_registro=fecha,
        pozo=nombre
    )


    return JsonResponse({'message': 'Archivo subido exitosamente'})

class DatasetDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Dataset.objects.all()
    serializer_class = DatasetSerializer
    lookup_field = 'id'




@api_view(['GET'])
def get_news(request):
    try:
        return JsonResponse({"noticias": traer_noticias()}, status=200)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)