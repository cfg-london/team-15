# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render
from django.http import HttpResponse
import json

from models import Referral

# Create your views here.

def add_referral(request):
    data = json.loads(request.body.decode("utf-8"))

    sender = data['sender']
    name = data['name']
    phone = data['phone']
    urgency = data['urgency']

    Referral.objects.create(sender=sender, name=name, phone=phone, urgency=urgency);

    return HttpResponse("Hello World!" + json.dumps(data))
