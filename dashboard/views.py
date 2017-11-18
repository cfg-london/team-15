# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.http import HttpResponse

from referral.models import Referral

import cStringIO as StringIO
import csv

# Create your views here.

def download_csv(request):
    referrals = Referral.objects.all()

    # Initialise the csv writer
    # with open('data.csv', 'wb') as csvfile:
    csvfile = StringIO.StringIO()
    csvwriter = csv.writer(csvfile)
    # Write column names
    csvwriter.writerow([u"Sender", u"Vulnerable adult's name", u"Phone number",
                        u"Urgent", u"Category", u"Date", u"Location", u"Extra info"])

    for entry in referrals:
        csvwriter.writerow([entry.sender, entry.name, entry.phone,
                            entry.urgency, entry.category, entry.date,
                            entry.latitude + ',' + entry.longitude, entry.extrainfo])

    response = HttpResponse(csvfile.getvalue(), content_type='text/csv')
    response["Content-Disposition"] = "attachment; filename=data.csv"

    return response
