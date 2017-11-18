from django.conf.urls import url, include
from . import views

urlpatterns = [
        url(r'^accounts/', include('django.contrib.auth.urls')),
        url(r'^csv/', views.download_csv, name='download_csv')
]
