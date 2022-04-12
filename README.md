# Dungeon Master's Tracker

Current project [Angular CLI](https://github.com/angular/angular-cli) version: 13.2.4.

## About the project
This is a Dungeons & Dragons 5e tool, which's purpose is to be a kind of a **digital, interactive Dungeon Master's screen**. 
It is **NOT a graphical interface** containing info about every skill in the game, simulate rolls etc. - 
you've got other tools for that. It assumes that **the game action is on the table**, and handles repetitive tasks 
that otherwise would slow down the pace of the gameplay, so everyone can focus on the 
game itself instead of counting initiative order etc. 

## Current features
1. Battle tracking
    * Automatically loads protagonists
    * Adding other actors
        * Checkbox for death saving throws eligibility when adding an actor to battle
    * Setting initiative and automatic sorting by initiative after starting the battle
        * Resolving initiative conflicts with modal when some actors rolled the same initiative
    * Death
        * Removing non-magical conditions on death
    * Adding/removing conditions
    * Adding/subtracting Hit Points
        * Death saving throws counter when character becomes Unconscious by damage
        * Automatic setting/removing Unconscious condition when actor's HP reach 0 or gets healed
        * Automatic 'dead' state when actor's HP reaches opposite value of actor's max HP
    * Temporary Hit Points mechanics
    * Button to progress given actor's turn
    * Automatic next round when all actors participating in battle have progressed their turn
        * Automatic progressed turn for Unconscious/Dead actors
        * Automatic condition removal when its duration ends
2. Tools
    * 3D distance calculator (e.g. to calculate distance between afoot players and a flying dragon)
    * Travel time calculator
    * Combat difficulty calculator
        * Based on Dungeon Master's Guide, page 82.
        * Calculates difficulty based on selected actors, monster total XP and monster count
3. Cheat sheets
    * SI/imperial systems switch
    * Travelling cheat sheets
        * Travel paces and distances
        * Rules for moving in Wilderness
    * Combat cheat sheets
        * Cover cheat sheet
    * Ability checks cheat sheets
        * Abilities to associated skills
        * Difficulty checks cheat sheet
     * XP Thresholds by Character Level and Encounter Multipliers
     
## Upcoming features
1. Battle tracking
    * Modifying actors' HP before the battle
    * Adding/removing actors before the battle
    * Editing condition duration mid-fight
2. Persisting data
3. Time progress
    * Recording time spent in the campaign
    * Automatic passed time increasing on travel record
    * Adding recorded events on a timeline, time passed since that event
4. Tools
    * Imperial to SI/vice-versa calculator (simplified for DnD usage)
    * Travel time calculator enhancements
        * Taking into account that e.g. day of traveling with slow pace doesn't add up to 8 hours etc.
    * Combat difficulty calculator
        * Calculating monster total XP based on actors, monster count and desired difficulty
        * Encounter builder based on desired actors and difficulty
            * Monster dropdown based on Monster Manual
            * Filtering available monsters from that dropdown
5. Custom notes
    * Creating, editing, deleting and editing
    * Displaying date when created and last edited
    * Title and optional description
6. Cheat sheets

## Known issues
* no validation on inputs
