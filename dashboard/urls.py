from django.conf.urls import url, include
from dashboard import views

urlpatterns = [
        url(r'^accounts/', include('django.contrib.auth.urls')),
        url(r'^dashboard/$', views.dashboard, name="dashboard"),
        url(r'^csv/', views.download_csv, name='download_csv'),
]
