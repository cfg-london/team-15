# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.test import TestCase
from django.urls import reverse
import json

from models import Referral

# Create your tests here.
class ReferralTests(TestCase):

    def test_add_urgent_referral(self):
        data = json.dumps({'sender': 'Police', 'name': 'Adam',
                        'phone': '0777777777', 'urgency': True, 'category_name': 'Medical'})

        response = self.client.post(reverse('add_referral'), data, content_type='application/json')
        self.assertIs(response.status_code, 200)
        self.assertTrue(Referral.objects.filter(sender='Police').exists())
        self.assertFalse(Referral.objects.filter(sender='GP').exists())
