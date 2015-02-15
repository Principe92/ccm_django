from time import mktime
import datetime

def toJSTime(object):
  time = object.timetuple()
  stamp = mktime(time)
  return str(stamp * 1000.0)
