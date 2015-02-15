# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations


class Migration(migrations.Migration):

    dependencies = [
        ('turnos', '0003_auto_20150202_1005'),
    ]

    operations = [
        migrations.AddField(
            model_name='event',
            name='department',
            field=models.ForeignKey(related_name='events', default='24', to='turnos.Department'),
            preserve_default=False,
        ),
        migrations.AlterUniqueTogether(
            name='event',
            unique_together=set([('date', 'department')]),
        ),
    ]
