# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0010_auto_20150226_1534'),
    ]

    operations = [
        migrations.AlterField(
            model_name='eventroles',
            name='event',
            field=models.ForeignKey(related_name='eventroles', to='turnos.Event'),
            preserve_default=True,
        ),
    ]
