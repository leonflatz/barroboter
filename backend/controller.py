import RPi.GPIO as GPIO
import time

VERTICAL_SPEED_CONTROL = 0.001
HORIZONTAL_SPEED_CONTROL = 0.001

CURRENT_STATION = 0

############## GPIO SETUP ###########

# horizontal stepper motor
DIR_PIN_HOR = 20
STEP_PIN_HOR = 21

# vertical stepper motor
DIR_PIN_VER = 13
STEP_PIN_VER = 26 

# starter button
#START_BUTTON_PIN = 16 

# end button
END_BUTTON_PIN = 16
START_BUTTON_PIN = 12
#END_BUTTON_PIN_2 = 13

class RaspiHandler:
    @classmethod
    def handle_request(cls, stations):
        """Handle a drink request by visiting specified stations"""
        cls.go_to_end()
        for station in stations:
            cls.move_to_station(station)
            cls.move_up()
            cls.move_down()
        cls.go_to_end()
        cls.shutoff_motor()

    @classmethod
    def setup(cls):
        """Initialize GPIO settings"""
        GPIO.setmode(GPIO.BCM)
        
        # Horizontal stepper motor
        GPIO.setup(cls.DIR_PIN_HOR, GPIO.OUT)
        GPIO.setup(cls.STEP_PIN_HOR, GPIO.OUT)
        
        # Vertical stepper motor
        GPIO.setup(cls.DIR_PIN_VER, GPIO.OUT)
        GPIO.setup(cls.STEP_PIN_VER, GPIO.OUT)
        
        # End button
        GPIO.setup(cls.END_BUTTON_PIN, GPIO.IN, pull_up_down=GPIO.PUD_DOWN)

    @classmethod
    def set_horizontal_direction(cls, direction):
        """Set horizontal motor direction"""
        GPIO.output(cls.DIR_PIN_HOR, GPIO.HIGH if direction == "cw" else GPIO.LOW)
    
    @classmethod
    def set_vertical_direction(cls, direction):
        """Set vertical motor direction"""
        GPIO.output(cls.DIR_PIN_VER, GPIO.HIGH if direction == "cw" else GPIO.LOW)

    @classmethod
    def move_horizontal_motor(cls, steps, direction, check_end_button=False):
        """Move horizontal motor a specified number of steps"""
        cls.set_horizontal_direction(direction)
        
        buttonPin = cls.START_BUTTON_PIN if direction == "ccw" else cls.END_BUTTON_PIN

        for _ in range(steps):
            if check_end_button and GPIO.input(cls.END_BUTTON_PIN) == GPIO.HIGH:
                break
                
            GPIO.output(cls.STEP_PIN_HOR, GPIO.HIGH)
            time.sleep(cls.HORIZONTAL_SPEED_CONTROL)
            GPIO.output(cls.STEP_PIN_HOR, GPIO.LOW)

    @classmethod
    def move_to_station(cls, station):
        """Move to a specific station (0-7)"""
        if station < 0 or station > 7:
            raise ValueError("Station must be between 0 and 7")
        
        if station > cls.CURRENT_STATION:
            steps = (station - cls.CURRENT_STATION) * cls.STEPS_PER_STATION
            cls.move_horizontal_motor(steps, "cw")
        elif station < cls.CURRENT_STATION:
            steps = (cls.CURRENT_STATION - station) * cls.STEPS_PER_STATION
            cls.move_horizontal_motor(steps, "ccw")
        
        cls.CURRENT_STATION = station
        time.sleep(0.5)  # Main delay from original code


    @classmethod
    def move_up(cls):
        """Move the dispenser up"""
        cls.set_vertical_direction("cw")
        for _ in range(245):
            GPIO.output(cls.STEP_PIN_VER, GPIO.HIGH)
            time.sleep(cls.VERTICAL_SPEED_CONTROL)
            GPIO.output(cls.STEP_PIN_VER, GPIO.LOW)
        time.sleep(0.5)  # Main delay from original code

    @classmethod
    def move_down(cls):
        """Move the dispenser down"""
        cls.set_vertical_direction("ccw")
        for _ in range(245):
            GPIO.output(cls.STEP_PIN_VER, GPIO.HIGH)
            time.sleep(cls.VERTICAL_SPEED_CONTROL)
            GPIO.output(cls.STEP_PIN_VER, GPIO.LOW)
        time.sleep(0.5)  # Main delay from original code

    @classmethod
    def go_to_end(cls):
        cls.move_horizontal_motor(8000, "ccw", check_end_button=True)
        cls.CURRENT_STATION = 0

    @classmethod
    def go_to_start(cls):
        cls.move_horizontal_motor(8000, "cw", check_end_button=True)
        cls.CURRENT_STATION = 7

    @classmethod
    def shutoff_motor(cls):
        """Clean up GPIO resources"""
        GPIO.cleanup()