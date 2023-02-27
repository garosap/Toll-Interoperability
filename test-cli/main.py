import subprocess
from pathlib import Path
import json

my_path = str(Path(__file__).resolve().parent.parent)

# Test generic successful chargesby command
def test_chargesby_a():
    command = my_path + '/cli/chargesby --op1 aodos --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful chargesby command by counting the total number of passes returned
def test_chargesby_b():
    command = my_path + '/cli/chargesby --op1 aodos --datefrom 20201005 --dateto 20201010 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    counter = 0
    for x in obj['PPOList']:
        counter += x['NumberOfPasses']
    assert counter == 19

# Test successful chargesby command by counting the total cost of passes returned
def test_chargesby_c():
    command = my_path + '/cli/chargesby --op1 gefyra --datefrom 20210801 --dateto 20211031 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    cost = 0
    for x in obj['PPOList']:
        cost += x['PassesCost']
    assert cost == 91

# Test unsuccessful chargesby command because of invalid dates, datefrom > datato
def test_chargesby_d():
    command = my_path + '/cli/chargesby --op1 aodos --datefrom 20211110 --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful chargesby command because of invalid operator
def test_chargesby_e():
    command = my_path + '/cli/chargesby --op1 odoskappa --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful chargesby command because of wrong input
def test_chargesby_f():
    command = my_path + '/cli/chargesby --op1 adsfd --datefrom asdfsdf --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful chargesby command because of wrong format
def test_chargesby_g():
    command = my_path + '/cli/chargesby --op1 aodos --datefrom 20211005 --dateto 20211110 --format nope'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# -----------------------------------------------------------------------------------------------------

# Test generic successful passecost command
def test_passescost_a():
    command = my_path + '/cli/passescost --op1 aodos --op2 gefyra --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful passescost command by counting the total number of passes returned
def test_passescost_b():
    command = my_path + '/cli/passescost --op1 aodos --op2 gefyra --datefrom 20201005 --dateto 20201010 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    counter = obj['NumberOfPasses']
    assert counter == 4

# Test successful passescost command by counting the total cost of passes returned
def test_passescost_c():
    command = my_path + '/cli/passescost --op1 aodos --op2 gefyra --datefrom 20210801 --dateto 20211031 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    cost = obj['PassesCost']
    assert cost == 89.6

# Test unsuccessful passescost command because of invalid dates, datefrom > datato
def test_passescost_d():
    command = my_path + '/cli/passescost --op1 aodos --op2 gefyra --datefrom 20211110 --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passescost command because of invalid operators
def test_passescost_e():
    command = my_path + '/cli/passescost --op1 odoskappa --op2 gefyra --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passescost command because of wrong input
def test_passescost_f():
    command = my_path + '/cli/passescost --op1 adsfd --op2 sadfs --datefrom asdfsdf --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passescost command because of wrong format
def test_passescost_g():
    command = my_path + '/cli/passescost --op1 aodos --op2 gefyra --datefrom 20211005 --dateto 20211110 --format nope'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out


# -----------------------------------------------------------------------------------------------------

# Test generic successful passesanalysis command
def test_passesanalysis_a():
    command = my_path + '/cli/passesanalysis --op1 aodos --op2 gefyra --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful passesanalysis command by counting the total number of passes returned
def test_passesanalysis_b():
    command = my_path + '/cli/passesanalysis --op1 aodos --op2 gefyra --datefrom 20201005 --dateto 20201010 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    counter = obj['NumberOfPasses']
    assert counter == 4

# Test successful passesanalysis command by counting the total number of passes returned
def test_passesanalysis_c():
    command = my_path + '/cli/passesanalysis --op1 aodos --op2 gefyra --datefrom 20201005 --dateto 20201010 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    counter = 0
    for x in obj['PassesList']:
        counter += x['Charge']
    assert counter == 11.2


# Test unsuccessful passesanalysis command because of invalid dates, datefrom > datato
def test_passesanalysis_d():
    command = my_path + '/cli/passesanalysis --op1 aodos --op2 gefyra --datefrom 20211110 --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passesanalysis command because of invalid operators
def test_passesanalysis_e():
    command = my_path + '/cli/passesanalysis --op1 odoskappa --op2 gefyra --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passesanalysis command because of wrong input
def test_passesanalysis_f():
    command = my_path + '/cli/passesanalysis --op1 adsfd --op2 sadfs --datefrom asdfsdf --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passesanalysis command because of wrong format
def test_passesanalysis_g():
    command = my_path + '/cli/passesanalysis --op1 aodos --op2 gefyra --datefrom 20211005 --dateto 20211110 --format nope'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out


# -----------------------------------------------------------------------------------------------------

# Test generic successful passesperstation command
def test_passesperstation_a():
    command = my_path + '/cli/passesperstation --station KO01 --datefrom 20190101 --dateto 20190110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful passesperstation command by counting the total number of passes returned
def test_passesperstation_b():
    command = my_path + '/cli/passesperstation --station KO01 --datefrom 20190101 --dateto 20190110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    counter = 0
    counter = obj['NumberOfPasses']
    assert counter == 7

# Test successful passesperstation command by counting the total cost of passes returned
def test_passesperstation_c():
    command = my_path + '/cli/passesperstation --station KO01 --datefrom 20190101 --dateto 20190110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    data = out.decode().split('\n', 1)[1].replace("\'", "\"")
    obj = json.loads(data)
    cost = 0
    for x in obj['PassesList']:
        cost += x['PassCharge']
    assert cost == 16.6

# Test unsuccessful passesperstation command because of invalid dates, datefrom > datato
def test_passesperstation_d():
    command = my_path + '/cli/passesperstation --station KO01 --datefrom 20190110 --dateto 20190101 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passesperstation command because of invalid operators
def test_passesperstation_e():
    command = my_path + '/cli/passesperstation --station KO0132 --datefrom 20211005 --dateto 20211110 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passesperstation command because of wrong input
def test_passesperstation_f():
    command = my_path + '/cli/passesperstation --station asdf1 --datefrom asdfsdf --dateto 20211005 --format json'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccesful passesperstation command because of wrong format
def test_passesperstation_g():
    command = my_path + '/cli/passesperstation --station KO01 --datefrom 20211005 --dateto 20211110 --format nope'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out