Feature: CircuitsApi
    In order to impress my friends
    As a Formula 1 fan
    I want to know the number of races for a given Formula 1 season

    Scenario Outline: Check the number of races in "<season>"
        # Given I want to know the number of Formula One races in <season>
        # hence Given is a precondition we can re-write it to
        Given that I visit the URL for Formula One race "https://ergast.com/api/f1"
        # When I retrieve the circuit list for that season
        # and When is/are steps
        When I search for season "<season>" and circuits "<numberOfCircuits>"
        Then there should be a list returned from that search
        Examples:
            | season | numberOfCircuits |
            | 2017   | 20               |
            | 2016   | 21               |
            | 1966   | 9                |
            | 1950   | 8                |
