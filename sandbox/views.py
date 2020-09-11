
from django.shortcuts import render
import json
from django.http import JsonResponse, HttpResponse
from django.views.decorators.csrf import csrf_exempt
from func_timeout import func_set_timeout, FunctionTimedOut
import six
import logging
import traceback
import sys
import os

logger = logging.getLogger('sandbox_api') #from LOGGING.loggers in settings.py


@csrf_exempt
def main_page(request):
    if request.method=='POST':

        @func_set_timeout(15)
        def exec_wrapper(code, g_dict):
            exec(code,g_dict)
        try:
            code, g_dict = json.loads(json.loads(request.body))
            exec_wrapper(code,g_dict)
            g_dict = json_safe(g_dict)
            logger.info(g_dict)
            return JsonResponse(g_dict)

        except FunctionTimedOut as err:
            exc_type, exc_obj, exc_traceback = sys.exc_info()
            traceback_details = {
                         'text'    :'The time of code execution is too long',
                         'type'    : exc_type.__name__,
                         'message' : str(exc_obj), # or see traceback._some_str()
                        }
            response_message = '{0[type]}: {0[text]}'.format(traceback_details)
            logger.error(response_message)
            g_dict = {'error_tb':response_message}
            return JsonResponse(g_dict)

        except SyntaxError as err:
            exc_type, exc_obj, exc_traceback = sys.exc_info()
            traceback_details = {
                         'text'    : err.text,
                         'type'    : exc_type.__name__,
                         'message' : str(exc_obj), # or see traceback._some_str()
                        }

            response_message = '{0[type]}: {0[text]}'.format(traceback_details)
            logger.error(response_message)
            g_dict = {'error_tb':response_message}
            return JsonResponse(g_dict)

        except Exception as err:
            exc_type, exc_obj, exc_traceback = sys.exc_info()
            traceback_details = {
                         'type'    : exc_type.__name__,
                         'message' : str(exc_obj), # or see traceback._some_str()
                        }

            response_message = '{0[type]}: {0[message]}'.format(traceback_details)
            logger.error(response_message)
            g_dict = {'error_tb':response_message}
            return JsonResponse(g_dict)


    return HttpResponse('Only, post requests available')

def json_safe(d):
    """
    Return only the JSON-safe part of d(a python dict object).
    Used to emulate reading data through a serialization straw.
    """

    # six.binary_type is here because bytes are sometimes ok if they represent valid utf8
    # so we consider them valid for now and try to decode them with decode_object.  If that
    # doesn't work they'll get dropped later in the process.
    ok_types = (type(None), int, float, six.binary_type, six.text_type, list, tuple, dict)

    def decode_object(obj):
        """
        Convert an object to a JSON serializable form by decoding all byte strings.
        In particular if we find any byte strings try to convert them to
        utf-8 strings.  If we run into byte strings that can't be decoded as utf8 strings
        throw an exception.
        For other non-serializable objects we return them as is.
        raises: Exception
        """
        if isinstance(obj, bytes):
            return obj.decode('utf-8')
        elif isinstance(obj, (list, tuple)):
            new_list = []
            for i in obj:
                new_obj = decode_object(i)
                new_list.append(new_obj)
            return new_list
        elif isinstance(obj, dict):
            new_dict = {}
            for k, v in six.iteritems(obj):
                new_key = decode_object(k)
                new_value = decode_object(v)
                new_dict[new_key] = new_value
            return new_dict
        else:
            return obj

    bad_keys = ("__builtins__",)
    jd = {}
    for k, v in six.iteritems(d):
        if not isinstance(v, ok_types):
            continue
        if k in bad_keys:
            continue
        try:
            # Python's JSON encoder will produce output that
            # the JSON decoder cannot parse if the input string
            # contains unicode "unpaired surrogates" (only on Linux)
            # To test for this, we try decoding the output and check
            # for a ValueError
            v = json.loads(json.dumps(decode_object(v)))

            # Also ensure that the keys encode/decode correctly
            k = json.loads(json.dumps(decode_object(k)))
        except Exception:
            continue
        else:
            jd[k] = v
    return json.loads(json.dumps(jd))
