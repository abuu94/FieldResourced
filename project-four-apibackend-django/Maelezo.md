### Project: Hii ni simple backend django project inaitwa Staff Info Systen

#### Function:

- Kazi yake kuhifadhi Staff Details

#### Guidance:

- Fuata maelezo haya kudevelop django project ` https://tutorial.djangogirls.org/en/django_installation/`

#### Tumia Command zifuatazo hatua kwa hatua :

```
mkdir apibackend
cd apibackend
python3 -m venv myvenv
myvenv/script/activate
pip install -r requirements.txt
django-admin.exe startproject mysite .
python manage.py migrate
python manage.py runserver
python manage.py startapp staff
python manage.py makemigrations staff
python manage.py migrate
python manage.py createsuperuser

```

### Ndani ya requirement.txt weka code hizi

```
Django
djangorestframework
djangorestframework-simplejwt
drf-yasg
Pillow
psycopg2-binary
django-cors-headers

```

#### ndani ya staff/model.py weka code zifuatazo

```
from django.db import models

# Create your models here.

class Staff(models.Model):
    name = models.CharField(max_length=100)
    age = models.PositiveIntegerField()
    address = models.TextField()
    phone_number = models.CharField(max_length=15)
    payroll_number = models.CharField(max_length=50, unique=True)
    staff_image = models.ImageField(upload_to='staff_images/', blank=True, null=True)

    def __str__(self):
        return f"{self.name} ({self.payroll_number})"

```

#### Ndani ya mysite/settings.py weka code zifuatazo

```
TIME_ZONE = 'Europe/Berlin'
STATIC_URL = 'static/'
STATIC_ROOT = BASE_DIR / 'static'
ALLOWED_HOSTS = ['localhost', '127.0.0.1', '.pythonanywhere.com']
```

#### Ndani ya staff/admin.py weka code zifuatazo

```
from django.contrib import admin

# Register your models here.
# from django.contrib import admin
from .models import Staff

@admin.register(Staff)
class StaffAdmin(admin.ModelAdmin):
    list_display = ('name', 'age', 'phone_number', 'payroll_number')
    search_fields = ('name', 'payroll_number', 'phone_number')
    list_filter = ('age',)
    ordering = ('name',)

```

#### Kuna settings muhimu unapaswa kuzifahamu na kuzifanya kwenye sehemu zifuatazo:

- mysite/settings.py
- mysite/urls.py
- staff/urls.py

): Muulize mwanafunzi mwenzako akupe maelekezo ili kukamilisha sehemu hizo
