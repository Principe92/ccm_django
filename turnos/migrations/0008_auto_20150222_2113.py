# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0007_auto_20150222_2109'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventid',
            name='event',
            field=models.OneToOneField(related_name='event_number', primary_key=True, serialize=False, to='turnos.Event'),
            preserve_default=True,
        ),
    ]
