from django.db import models

# Create your models here.

class Dataset(models.Model):
    time = models.DecimalField(max_digits=10, decimal_places=6)
    pressure = models.DecimalField(max_digits=10, decimal_places=2)
    temperature = models.DecimalField(max_digits=10, decimal_places=2)
    depth = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_registro = models.CharField(max_length=100, null=True)
    pozo = models.CharField(max_length=100, null=True)
    
