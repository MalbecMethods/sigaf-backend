# datasets/urls.py

from django.urls import path
from .views import upload_file
from .views import get_datasets
from .views import send_data
from .views import DatasetDetail
from .views import get_news

urlpatterns = [
    path('upload/', upload_file, name='upload_file'),
    path('api/', get_datasets, name='get_datasets'),
    path('senddata/', send_data, name='send_data'),
    path('api/<int:id>/', DatasetDetail.as_view(), name='dataset-detail'),
    path('getnews/', get_news, name='get_news'),
]
