#include <iostream>
using namespace::std;

int main() {
    int arr1[10] = {1,2,3,4,5,6,7,8,9,10};
    int arr2[5] = {-10,3,2,1,4};
    int arr[2] = {1,-1};

    cout << sumArray(arr1,10) << endl;
    cout << sumArray(arr2,5) << endl;
    cout << sumArray(arr3,2) << endl;
}