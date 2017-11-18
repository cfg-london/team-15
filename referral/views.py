# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db.models import Count
from django.http import HttpResponse
from django.views.decorators.csrf import csrf_exempt
from django.shortcuts import redirect, render
from django.core import serializers
from django.core.mail import send_mail

import json

from .models import Referral, Category

# Create your views here.

@csrf_exempt
def add_referral(request):
    data = json.loads(request.body.decode("utf-8"))

    # Urgent
    sender = data['sender']
    name = data['name']
    phone = data['phone']
    urgency = data['urgency']
    category_name = data['category_name']

    # Non-urgent (optional)
    if 'extrainfo' in data.keys():
        extrainfo = data['extrainfo']
    else:
        extrainfo = ''

    if 'latitude' in data.keys():
        latitude = data['latitude']
    else:
        latitude = 0

    if 'longitude' in data.keys():
        longitude = data['longitude']
    else:
        longitude = 0

    category = Category(name=category_name)
    category.save()

    referral = Referral(sender=sender, name=name, phone=phone, urgency=urgency,
                        latitude=latitude, longitude=longitude, extrainfo=extrainfo);
    referral.save()

    category.referrals.add(referral)

    subject = ''
    if urgency:
        subject = subject + '[URGENT!] '
    subject = subject + 'Someone needs help!'

    body = name + '(' + phone + ') ' + 'needs help for ' + category_name + ' reasons. He was referred by ' \
        + sender + '.'

    if latitude != '':
        body = body + ' His location is ('  + str(latitude) + ', ' + str(longitude) + ').'

    send_mail(subject, body, 'code4bants@gmail.com', ['e.pattie@warwick.ac.uk'])

    return HttpResponse(json.dumps(data))

def get_popular_categories(request):
    popular_categories = Category.objects.annotate(r_count=Count('referrals')).order_by('-r_count')
    data = serializers.serialize('json', popular_categories, fields=('name'))

    return HttpResponse(json.dumps(data))
