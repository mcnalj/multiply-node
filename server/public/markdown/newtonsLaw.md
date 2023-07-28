## Differential Equations: Newton's Law of Cooling



How long until your tea, coffee or hot chocolate is cool enough to drink?

Of course, that all depends on what kind of container it's in and where you are drinking it.

If you are standing on Cow Island in a 45 degree rain with a steady wind, your paper cup full of hot chocolate won't stay warm for long.

But if it's an 80 degree summer night, your ceramic mug of delicousness might feel like it takes forever to cool down.

If we ignore wind and rain, basically the cooling rate of our drink depends on three factors:

1. the difference in temperature between the air and our drink
2. the type of container the drink is in
3. the amount of time it has been cooling

In fact, Isaac Newton devised an equation that allows us to predict the temparature of a cooling substance at any given time. Here it is:
$$
T - T_{env} = (T_0-T_{env})e^{-kt}
$$
In words, Newton's Law of Cooling says that the current difference between the temperature of the drink and the environment, equals the initial difference between the temperature of the drink and the environment times *e* raised to the *-kt* power. 

In this equation *k* is the insulating property of the container and *t* is time.

### Experiment: Calculating *k*

Let's compare different containers to find their *k* value. We will take temperature readings with a temperature sensor and use Newton's Law of Cooling to calculate *k*.

#### Step 1:

Connect a Vernier Go!Temp probe to a macbook and open Logger Lite (installed on Macbooks 36, 37, 39, 40, 41).

#### Step 2:

Record the ambient room temperature.

#### Step 3:

In Logger Lite, click Experiment -> Data Collection and set the Data Collection duration to 360 seconds and the sampling rate to 1/seconds.

#### Step 4:

Place the Go!Temp in a container of hot water. Give it a minute or so to get an accurate temperature, then press the Collect button to begin sampling.

#### Calculate *k*

Pick a value for *t* (60 seconds seems reasonable). Plug your measurements into Newton's Law of Cooling and calculate *k* for your container.

#### Validate your calculation for *k*

See if your k value is correct. Using your calculated *k* value, use Newton's Law of Cooling to predict the temperature of the hot liquid aftere 6 minutes (360 seconds). Compare your calculation to the actual measured temperature.

