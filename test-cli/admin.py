import subprocess
from pathlib import Path

my_path = str(Path(__file__).resolve().parent.parent)

# Test successful healthcheck command
def test_healthcheck():
    command = my_path + '/cli/healthcheck'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful resetpasses command
def test_resetpasses():
    command = my_path + '/cli/resetpasses'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful resetstations command
def test_resetstations():
    command = my_path + '/cli/resetstations'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test successful resetvehicles command
def test_resetvehicles():
    command = my_path + '/cli/resetvehicles'
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out

# Test unsuccessful passesupd command because of invalid file type
def test_admin_passesupd_a():
    command = my_path + '/cli/admin --passesupd --source ' + my_path + '/backend/passes.json'
    print(command)
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'400: Bad request' in out

# Test unsuccessful passesupd command because of non existent file
def test_admin_passesupd_b():
    command = my_path + '/cli/admin --passesupd --source ' + my_path + '/backend/foo.csv'
    print(command)
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'500: Internal server error' in out

# Test successful passesupd command with valid file
def test_admin_passesupd_c():
    command = my_path + '/cli/admin --passesupd --source ' + my_path + '/backend/passes.csv'
    print(command)
    out = subprocess.run(command.split(), stdout=subprocess.PIPE).stdout
    assert b'200: Success' in out