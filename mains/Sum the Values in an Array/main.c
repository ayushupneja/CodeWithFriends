#include <stdio.h>

int main() {
    int arr1[10] = {1,2,3,4,5,6,7,8,9,10};
    int arr2[5] = {-10,3,2,1,4};
    int arr3[3] = {1,-1,4};

    printf("55 %d\n",sumArray(arr1,10));
    printf("0 %d\n",sumArray(arr2,5));
    printf("4 %d\n",sumArray(arr3,3));

}